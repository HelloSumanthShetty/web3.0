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
    // Transactions:[]
    connectWallet: async () => { },
    FormData: {
        addressTo: "",
        amount: "",
        keyword: "",
        message: ""
    },
    setFormData: {},
    handlechange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => { }
});

const { ethereum } = window

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);           //read or fetches balances form metamask 
    const signer = provider.getSigner();                                      //get the signer that is need to do mutating data
    const TransactionContract = new ethers.Contract(contractAddress, constractABI, signer)
    return TransactionContract



}

export const TransactionProvider = ({ children }: { children: React.ReactNode }) => {

    const [CurrentAccount, setCurrentAccount] = useState("")
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
            //window.ethereum 
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

    const connectWallet = async () => {
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

    const sendTransaction = async () => {
        try {
            if (!ethereum) {
                return alert("Please Install metamask");

            }
            const { addressTo, amount, keyword, message } = FormData;
            const hexamount = ethers.utils.parseEther(amount)
            const TransactionContract = getEthereumContract()
            console.log(TransactionContract)
            await ethereum.request({
                method: "eth_sendTransaction",
                params: [
                    {
                        from: CurrentAccount,
                        to: addressTo,
                        gas: "0x5208", //hex of gwei 
                        value: hexamount._hex
                    }
                ]
            })

            const transactionHash = await TransactionContract.addToBlockchain(addressTo, hexamount, message, keyword)
            setisLoading(true)
            console.log(`Loading-${transactionHash.hash}`)
            await transactionHash.wait()
            setisLoading(false)
            console.log(`Success-${transactionHash.hash}`)

            const transactionCount = await TransactionContract.getTransactionCount()
           settransactionCount(transactionCount.toNumber())
        } catch (error) {
            console.error(error);
            throw new Error("no etherum object.")
        }
    }
    useEffect(() => {

        checkifWalletIsConnected()
    }, [])

    useEffect(() => {
        console.log(CurrentAccount)
    }, [CurrentAccount]);

    return (
        <TransactionContext.Provider value={{ connectWallet, CurrentAccount, FormData, setFormData, handlechange, sendTransaction }}>
            {children}
        </TransactionContext.Provider>
    );
};