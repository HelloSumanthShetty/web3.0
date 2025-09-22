const { ethereum } = window
import React, { useState, useEffect, } from 'react'
import { ethers, } from "ethers"

import { constractABI, contractAddress } from '../utils/constant'

declare global {
    interface Window {
        ethereum?: any
    }
}

//creates an global context 
export const TransactionContext = React.createContext({
    CurrentAccount: "",
    sendTransaction: () => { },
    connectWallet: async () => { },
    isLoading: true,
    FormData: {
        addressTo: "",
        amount: "",
        keyword: "",
        message: ""
    },
    checkifWalletIsConnected: () => { },
    handlechange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => { }
});


const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);           
    const signer = provider.getSigner();
    const TransactionContract = new ethers.Contract(contractAddress, constractABI, signer)
    return TransactionContract



}

export const TransactionProvider = ({ children }: { children: React.ReactNode }) => {

    const [CurrentAccount, setCurrentAccount] = useState("")
    const [Balance, setBalance] = useState("")
    const [FormData, setFormData] = useState({ addressTo: "", amount: "", keyword: "", message: "" })
    const [transactionCount, settransactionCount] = useState(localStorage.getItem("transactionCount"))
    const [isLoading, setisLoading] = useState(false)
    const handlechange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        setFormData((prev) => ({ ...prev, [name]: e.target.value }));
    };

    const checkifWalletIsConnected = async () => {
        try {
            if (!ethereum) {
                alert("Please Install Metamask!!")
            }
            const account = await ethereum.request({ method: "eth_accounts" });
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
            console.log("New balance is:", formattedBalance);

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

    const setupChainListener = () => {
        const chainIdHex = ethereum.chainId;
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

    return (
        <TransactionContext.Provider value={{ connectWallet, checkifWalletIsConnected, isLoading, CurrentAccount, FormData, handlechange, sendTransaction }}>
            {children}
        </TransactionContext.Provider>
    );
};