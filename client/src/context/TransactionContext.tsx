import React, { useState, useEffect, useRef } from 'react'
import { ethers, } from "ethers"
import toast from 'react-hot-toast'
import { FaInfo } from 'react-icons/fa'
import { constractABI, contractAddress } from '../utils/constant'

declare global {
    interface Window {
        ethereum?: any
    }
}

const { ethereum } = window

type FormDataType = {
    addressTo: string;
    amount: string;
    keyword: string;
    message: string;
};

type TransactionContextType = {
    CurrentAccount: string;
    sendTransaction: () => void;
    connectWallet: () => Promise<void>;
    disconnectWallet: () => void;
    isLoading: boolean;
    FormData: FormDataType;
    checkifWalletIsConnected: () => void;
    transactions: Array<any>;
    handlechange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
    balance: string;
    refreshBalance: () => Promise<void>;
    refreshTransactions: () => Promise<void>;
    chainId: number | null;
};


export const TransactionContext = React.createContext<TransactionContextType>({} as TransactionContextType);


const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const TransactionContract = new ethers.Contract(contractAddress, constractABI, signer)
    return TransactionContract

}

export const TransactionProvider = ({ children }: { children: React.ReactNode }) => {

    const [CurrentAccount, setCurrentAccount] = useState("")
    const [balance, setBalance] = useState("")
    const [FormData, setFormData] = useState({ addressTo: "", amount: "", keyword: "", message: "" })
    const [, settransactionCount] = useState(localStorage.getItem("transactionCount"))
    const [isLoading, setisLoading] = useState(false)
    const [transactions, setTransactions] = useState([]);
    const [chainId, setChainId] = useState<number | null>(null);
    const prevBalanceRef = useRef<string | null>(null)

    const isValidAddress = (address: string): boolean => {
        return ethers.utils.isAddress(address);
    };

    const handlechange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        setFormData((prev) => ({ ...prev, [name]: e.target.value }));
    };

    const checkifWalletIsConnected = async () => {
        try {
            if (!ethereum) {
                toast.error("Please Install MetaMask to continue!");
                return;
            }
            const account = await ethereum?.request({ method: "eth_accounts" });
            if (account.length > 0) {
                setCurrentAccount(account[0])
                await getBalance();
                await getChainId();
            }
            else {
                console.log("No account Found")
            }
        }
        catch (error: any) {
            console.error(error);
            toast.error("Failed to check wallet connection");
        }
    }
    const getBalance = async () => {
        try {
            if (!CurrentAccount) return "";

            if (!ethereum) {
                toast.error("Please Install MetaMask!");
                return "";
            }

            const balanceWei = await ethereum.request({
                method: "eth_getBalance",
                params: [CurrentAccount, "latest"]
            });

            const formattedBalance = ethers.utils.formatEther(balanceWei);
            if (prevBalanceRef.current !== null && formattedBalance !== prevBalanceRef.current) {
                toast.success("Balance updated: " + formattedBalance.substring(0, 6) + " ETH", { id: "balance-update" });
                getAllTransactions()
            }

            prevBalanceRef.current = formattedBalance;
            if (formattedBalance !== balance) {
                setBalance(formattedBalance);
            }
            return formattedBalance;

        } catch (error: any) {
            console.error("Failed to get balance:", error);
            toast.error("Failed to fetch balance");
            return "";
        }
    };

    const refreshBalance = async () => {
        await getBalance();

    };
    const getChainId = async () => {
        try {
            if (!ethereum) return null;
            const chainIdHex = await ethereum.request({ method: 'eth_chainId' });
            const chainIdNum = parseInt(chainIdHex, 16);
            setChainId(chainIdNum);
            return chainIdNum;
        } catch (error: any) {
            console.error("Failed to get chain ID:", error);
            return null;
        }
    };

    const connectWallet = async () => {
        const { ethereum } = window;
        try {
            if (!ethereum) {
                toast.error("Please Install MetaMask to continue!");
                return;
            }

            const accounts = await ethereum.request({ method: "eth_requestAccounts" });

            if (accounts.length > 0) {
                setCurrentAccount(accounts[0]);
                await getBalance();
                await getChainId();
                toast.success("Wallet connected successfully!");
            } else {
                toast.error("No accounts found. Please unlock your wallet.");
            }
        } catch (error: any) {
            console.error(error);
            if (error.code === 4001) {
                toast.error("Please connect to MetaMask.");
            } else {
                toast.error("Failed to connect wallet");
            }
        }
    }

    const disconnectWallet = () => {
        setCurrentAccount("");
        setBalance("");
        prevBalanceRef.current = null;
        setFormData({ addressTo: "", amount: "", keyword: "", message: "" });
        setChainId(null);
        setTransactions([]);
        const clearWalletLink = (storage: Storage) => {
            const keys = Object.keys(storage);
            keys.forEach((key) => {
                if (key.startsWith("-walletlink")) {
                    storage.removeItem(key);
                }
            });
        };
    
        clearWalletLink(localStorage);
        clearWalletLink(sessionStorage);
        localStorage.removeItem("theme");
        localStorage.removeItem("token");
        localStorage.removeItem("transactionCount");
        toast.success("Wallet disconnected successfully");
        window.location.reload();
    }

    const getAllTransactions = async () => {
        try {
            if (ethereum) {
                const transactionsContract = getEthereumContract();

                const availableTransactions = await transactionsContract.getAllTransactions();

                const structuredTransactions = availableTransactions.map((transaction: any) => ({
                    addressTo: transaction.receiver,
                    addressFrom: transaction.sender,
                    timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                    message: transaction.message,
                    keyword: transaction.keyword,
                    amount: parseInt(transaction.amount._hex) / (10 ** 18)
                }));

                setTransactions(structuredTransactions);
            } else {
                console.log("Ethereum is not present");
            }
        } catch (error: any) {
            console.log(error);
            toast.error("Failed to fetch transactions");
        }
    };

    const refreshTransactions = async () => {
        await getAllTransactions();
    };

    const setupAccountListener = () => {
        if (ethereum) {
            ethereum.on('accountsChanged', async (accounts: string[]) => {
                if (accounts.length > 0) {
                    const newAccount = accounts[0];

                    setTransactions([]);

                    setCurrentAccount(newAccount);

                    await getBalance();

                    setTimeout(async () => {
                        await getAllTransactions();
                    }, 100);
                    toast.success("Account changed");
                } else {
                    setCurrentAccount("");
                    setBalance("");
                    setTransactions([]);
                    toast("Wallet disconnected", { icon: <FaInfo /> });
                }
            });
        }
    };

    const sendTransaction = async () => {
        try {
            if (!ethereum) {
                toast.error("Please Install MetaMask");
                return;
            }

            if (!CurrentAccount) {
                toast.error("Please connect your wallet first");
                return;
            }

            const { addressTo, amount, keyword, message } = FormData;


            if (!addressTo || !amount || !keyword || !message) {
                toast.error("Please fill in all required fields!");
                return;
            }


            if (!isValidAddress(addressTo)) {
                toast.error("Invalid Ethereum address!");
                return;
            }

            const amountNum = parseFloat(amount);
            if (isNaN(amountNum) || amountNum <= 0) {
                toast.error("Please enter a valid amount greater than 0");
                return;
            }


            const currentBalance = parseFloat(balance || "0");
            if (currentBalance < amountNum) {
                toast.error(`Insufficient balance! You have ${parseFloat(balance).toFixed(4)} ETH`);
                return;
            }

            const hexAmount = ethers.utils.parseEther(amount);
            const TransactionContract = getEthereumContract();

            toast.loading("Processing transaction...", { id: "tx-loading" });

            const tx = await TransactionContract.addToBlockchain(
                addressTo,
                message,
                keyword,
                { value: hexAmount }
            );
            const shortHash = (hash: string) => `${hash.slice(0, 6)}...${hash.slice(-4)}`;

            setisLoading(true);
            toast.loading(`Transaction pending... ${shortHash(tx.hash)}`, { id: "tx-loading" });

            await tx.wait();
            setisLoading(false);
            toast.success(`Transaction successful! ${shortHash(tx.hash)}`, { id: "tx-loading", duration: 5000 });


            await getBalance();
            await getAllTransactions();

            setFormData({ addressTo: "", amount: "", keyword: "", message: "" });
            const transactionCount = await TransactionContract.getTransactionCount();
            settransactionCount(transactionCount.toNumber());
        } catch (error: any) {
            console.error(error);
            setisLoading(false);
            toast.error("Transaction failed. Please try again.", { id: "tx-loading" });


            if (error.code === 4001) {
                toast.error("Transaction rejected by user");
            } else if (error.code === -32603) {
                toast.error("Transaction failed. Check your balance and try again.");
            }
        }
    };

    useEffect(() => {
        checkifWalletIsConnected();
        getAllTransactions();
        setupAccountListener();


        return () => {
            if (ethereum) {
                ethereum.removeListener('chainChanged', () => { });
                ethereum.removeListener('accountsChanged', () => { });
            }
        };
    }, []);

    useEffect(() => {
        if (CurrentAccount) {
            getBalance();

            getAllTransactions();
        } else {

            setTransactions([]);
        }
    }, [CurrentAccount]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (CurrentAccount) {
            interval = setInterval(() => {
                refreshBalance();
            }, 5000);
        }
        return () => clearInterval(interval as NodeJS.Timeout);
    }, [CurrentAccount]);

    const value = {
        connectWallet,
        disconnectWallet,
        checkifWalletIsConnected,
        isLoading,
        transactions,
        CurrentAccount,
        FormData,
        handlechange,
        sendTransaction,
        balance,
        refreshBalance,
        refreshTransactions,
        chainId
    }
    return (
        <TransactionContext.Provider value={value}>
            {children}
        </TransactionContext.Provider>
    );
};