import React, { useState, useEffect, } from 'react'
import { ethers, } from "ethers"

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

// 2. Define the type for the entire context
type TransactionContextType = {
  CurrentAccount: string;
  sendTransaction: () => void;
  connectWallet: () => Promise<void>;
  isLoading: boolean;
  FormData: FormDataType;
  checkifWalletIsConnected: () => void;
  transactions: Array<any>;
  handlechange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
};


//creates an global context 
export const TransactionContext = React.createContext<TransactionContextType>({} as TransactionContextType );


const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);           
    const signer = provider.getSigner();
    const TransactionContract = new ethers.Contract(contractAddress, constractABI, signer)
    return TransactionContract

}

export const TransactionProvider = ({ children }: { children: React.ReactNode }) => {

    const [CurrentAccount, setCurrentAccount] = useState("")
    const [, setBalance] = useState("")
    const [FormData, setFormData] = useState({ addressTo: "", amount: "", keyword: "", message: "" })
    const [, settransactionCount] = useState(localStorage.getItem("transactionCount"))
    const [isLoading, setisLoading] = useState(false)
    const [transactions, setTransactions] = useState([]);

    const handlechange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        setFormData((prev) => ({ ...prev, [name]: e.target.value }));
    };

    const checkifWalletIsConnected = async () => {
        try {
            if (!ethereum) {
              return alert("Please Install Metamask!!")
            }
            const account = await ethereum?.request({ method: "eth_accounts" });
            if (account.length > 0) {
                setCurrentAccount(account[0])
            }
            else {
                console.log("No account Found")
            }
            console.log(CurrentAccount)
            console.log(account[0])
        }
        catch (error) {
            console.error(error);
            throw new Error("no etherum object.")
        }
    }
    const getBalance = async () => {
        try {

            if (!CurrentAccount) return;

            if (!ethereum) {
                return alert("Please Install Metamask!!");
            }

            const balanceWei = await ethereum.request({
                method: "eth_getBalance",
                params: [CurrentAccount, "latest"]
            });

            const formattedBalance = ethers.utils.formatEther(balanceWei);
            setBalance(formattedBalance);
            return formattedBalance
       
        } catch (error) {
            console.error("Failed to get balance:", error);
        }
    };
    const connectWallet = async () => {
        const { ethereum } = window;
        try {
            if (!ethereum) {
                alert("Please Install Metamask!!")
            }

            const accounts = await ethereum.request({ method: "eth_requestAccounts" });


            setCurrentAccount(accounts[0])
            console.log(accounts[0])
            console.log(CurrentAccount)
        } catch (error) {
            console.error(error);
            throw new Error("no etherum object.")
        }

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

        console.log(structuredTransactions);

        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };
    const setupChainListener = () => {
        const chainIdHex = ethereum?.chainId;
        console.log("Current Chain ID (Hex):", chainIdHex);
        if (ethereum) {
            ethereum.on('chainChanged', () => {
                console.log("Network has changed");
                const chainIdDecimal = parseInt(chainIdHex, 16);
                console.log("Decimal Chain ID:", chainIdDecimal);
                window.location.reload();
            }
            );
        }
    };

    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert("Please Install MetaMask");

            const { addressTo, amount, keyword, message } = FormData;
            if (!addressTo || !amount || !keyword || !message) {
               alert("Please fill in all required fields!");
               return;
              }
            const hexAmount = ethers.utils.parseEther(amount);
            const TransactionContract = getEthereumContract();
            const tx = await TransactionContract.addToBlockchain(
                addressTo,
                message,
                keyword,
                { value: hexAmount }
            );

            setisLoading(true);
            console.log(`Loading - ${tx.hash}`);
            console.log(isLoading)
            await tx.wait();
            setisLoading(false);
            console.log(`Success - ${tx.hash}`);
           const formattedBalance= await getBalance()
           
           alert(`${CurrentAccount} Money has been Updated to ${formattedBalance} `);
           setFormData({ addressTo: "", amount: "", keyword: "", message: "" });
           const transactionCount = await TransactionContract.getTransactionCount();
            settransactionCount(transactionCount.toNumber());
        } catch (error) {
            console.error(error);
            throw new Error("No ethereum object.");
        }
    };


    // const sendTransaction = async () => {
    //     try {
    //         if (!ethereum) {
    //             return alert("Please Install metamask");

    //         }
    //         const { addressTo, amount, keyword, message } = FormData;
    //         const hexamount = ethers.utils.parseEther(amount)
    //         const TransactionContract = getEthereumContract()
    //         console.log(TransactionContract)

    //         await ethereum.request({
    //             method: "eth_sendTransaction",
    //             params: [
    //                 {
    //                     from: CurrentAccount,
    //                     to: addressTo,
    //                     gas: "0x5208", //hex of gwei 
    //                     value: hexamount._hex
    //                 }
    //             ]
    //         })
    //         const transactionHash = await TransactionContract.addToBlockchain(addressTo, hexamount, message, keyword)
    //         setisLoading(true)
    //         console.log(`Loading-${transactionHash.hash}`)
    //         await transactionHash.wait()
    //         setisLoading(false)
    //         console.log(`Success-${transactionHash.hash}`)

    //         const transactionCount = await TransactionContract.getTransactionCount()
    //         settransactionCount(transactionCount.toNumber())
    //     } catch (error) {
    //         console.error(error);
    //         throw new Error("no etherum object.")
    //     }
    // }
    useEffect(() => {

        checkifWalletIsConnected()
        getAllTransactions();
        // if (window.ethereum) {

        //     const handleChainChanged = (chainIdHex :any) => {
        //         console.log("Network has changed to:", chainIdHex);
        //         window.location.reload();
        //     };


        //     window.ethereum.on('chainChanged', handleChainChanged);

        //     return () => {
        //         console.log("Removing chainChanged listener...");
        //         window.ethereum.removeListener('chainChanged', handleChainChanged);
        //     };
        // }
    }, [])
    useEffect(() => {
        console.log(CurrentAccount)
        getBalance();
        setupChainListener();
    }, [CurrentAccount]);
   const value={ connectWallet, checkifWalletIsConnected, isLoading, transactions, CurrentAccount, FormData, handlechange, sendTransaction }        
    return (
        <TransactionContext.Provider value={value}>
            {children}
        </TransactionContext.Provider>
    );
};