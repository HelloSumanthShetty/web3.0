import React,{useState,useEffect, Children} from 'react'
import {ethers, providers} from "ethers"

import { constractABI,contractAddress } from '../utils/constant'

declare global{
    interface Window{
        ethereum?:any
    }
}


export const TransactionContext=React.createContext({
    // currentAccount:null,
    // sendTransaction:()=>{},
    // Transactions:[]
   connectWallet:  async() => {}
});


const {ethereum}=window

const getEthereumContract=()=>{
    const provider = new ethers.providers.Web3Provider(ethereum);           //read or fetches balances form metamask 
    const signer=provider.getSigner();                                      //get the signer that is need to do mutating data
    const TransactionContract=new ethers.Contract( contractAddress,constractABI,signer)      


 
    console.log(

    {provider,signer,TransactionContext}
)
}

export const TransactionProvider = ({ children }: { children: React.ReactNode }) => {

    const [CurrentAccount, setCurrentAccount] = useState()
   const checkifWalletIsConnected=async()=>{
    try {
        if(!ethereum){
                    alert("Please Install Metamask!!")
                }
                //window.ethereum 
                const account =await ethereum.request({method:"eth_accounts"});
                if(account.lenght>0){
                    setCurrentAccount(account[0])
                }
                 else{
                    console.log("No account Found")
                 }
                console.log(account)
      }
         catch (error) {
            console.error(error);
            throw new Error("no etherum object.")
        } 
    } 
  const connectWallet=async()=>{
        try {
            if(!ethereum){
                alert("Please Install Metamask!!")
            }
            
            const accounts =await ethereum.request({method:"eth_requestAccounts"});
            
            setCurrentAccount(accounts[0])
        } catch (error) {
            console.error(error);
            throw new Error("no etherum object.")
        }
  }
  useEffect(() => {
    checkifWalletIsConnected()
  }, [])
  

    return (
    <TransactionContext.Provider value={{connectWallet}}>
      {children}
    </TransactionContext.Provider>
  );
};