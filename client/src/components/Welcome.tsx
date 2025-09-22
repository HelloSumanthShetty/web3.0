import React, { useContext,useState } from "react";
import { MdOutlineRefresh } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { SiEthereum } from "react-icons/si";
import { TransactionContext } from "../context/TransactionContext";
import Loader from "./Loader";

type InputProps = {
  placeholder: string;
  name: string;
  type: string;
  value?: string | number;
  handlechange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
};

const companyCommonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handlechange }: InputProps) => (
  <input
    placeholder={placeholder}
    type={type}
    name={name}
    value={value}
    onChange={(e) => handlechange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

const Welcome = () => {
      const [isaccountChanged, setisaccountChanged] = useState(false)
  const { connectWallet, isLoading, CurrentAccount, FormData, handlechange, checkifWalletIsConnected, sendTransaction } = useContext(TransactionContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendTransaction();
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex flex-1 justify-start flex-col md:mr-10">
        <h1 className="text-3xl sm:text-5xl text-white text-gradient py-10">
          Send Crypto <br /> Across the world
        </h1>
        <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
          Explore the crypto world. Buy and sell cryptocurrencies easily on Krypto.
        </p>

        {!CurrentAccount && (
          <button
            type="button"
            onClick={connectWallet}
            className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
          >
            <p className="text-white text-base font-semibold">Connect Wallet</p>
          </button>
        )}

        <div className="grid sm:grid-cols-3 grid-cols-2 w-full my-10">
          <div className={`rounded-tl-2xl ${companyCommonStyles}`}>Reliability</div>
          <div className={companyCommonStyles}>Security</div>
          <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>Ethereum</div>
          <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>Web 3.0</div>
          <div className={companyCommonStyles}>Low Fees</div>
          <div className={`rounded-br-2xl ${companyCommonStyles}`}>Blockchain</div>
        </div>
      </div>

      <div className="flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10">
        <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism">
          <div className="flex justify-between flex-col w-full h-full">
            <div className="flex justify-between items-start gap-3 ">
              <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                <SiEthereum fontSize={21} color="#fff" />
              </div>
              <MdOutlineRefresh className={`flex ml-auto text-neutral-900 ${isaccountChanged ? 'animate-spin' : ''}`} onClick={() => { 
                setisaccountChanged(true)
                checkifWalletIsConnected();
                setTimeout(() => {
                  setisaccountChanged(false)
                }, 1000);
              }} fontSize={19} />
              <BsInfoCircle fontSize={17} color="#fff" />
            </div>
            <div>
              <p className="text-white font-light text-sm truncate">{CurrentAccount}</p>
              <p className="text-white font-semibold text-lg mt-1">Ethereum</p>
            </div>
          </div>
        </div>

        <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
          <form className="w-full" onSubmit={handleSubmit}>
            <Input placeholder="Address To" name="addressTo" type="text" value={FormData.addressTo} handlechange={handlechange} />
            <Input placeholder="Amount (ETH)" name="amount" type="number" value={FormData.amount} handlechange={handlechange} />
            <Input placeholder="Keyword (Gif)" name="keyword" type="text" value={FormData.keyword} handlechange={handlechange} />
            <Input placeholder="Enter Message" name="message" type="text" value={FormData.message} handlechange={handlechange} />

            <div className="h-[1px] w-full bg-gray-400 my-2" />

           {isLoading
              ? <Loader />
              : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                >
                  Send now
                </button>
              )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
