import React, { useContext,useState } from "react";
import { MdOutlineRefresh } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { SiEthereum } from "react-icons/si";
import { TransactionContext } from "../context/TransactionContext";
import { useTheme } from "../context/ThemeContext";
import Loader from "./Loader";
import { useSpring, animated } from "@react-spring/web";

type InputProps = {
  placeholder: string;
  name: string;
  type: string;
  value?: string | number;
  handlechange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
};

const companyCommonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] text-sm font-light transition-colors duration-300";

const Input = ({ placeholder, name, type, value, handlechange }: InputProps) => {
  const { theme } = useTheme();
  return (
    <input
      placeholder={placeholder}
      type={type}
      name={name}
      value={value}
      onChange={(e) => handlechange(e, name)}
      className={`my-2 w-full rounded-sm p-2 outline-none bg-transparent border-none text-sm white-glassmorphism ${
        theme === 'dark' ? 'text-white' : 'text-gray-900 placeholder-gray-500'
      }`}
    />
  );
};

const Welcome = () => {
  const [isaccountChanged, setisaccountChanged] = useState(false)
  const [flipped, setFlipped] = useState(false);
  const { connectWallet, isLoading, CurrentAccount, FormData, handlechange, checkifWalletIsConnected, sendTransaction, balance, refreshBalance } = useContext(TransactionContext);
  const { theme } = useTheme();

  const [props, set] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    config: { mass: 5, tension: 350, friction: 40 },
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!CurrentAccount) {
      return;
    }
    sendTransaction();
  };
  const getCardClasses = () => {
  return theme === "dark"
    ? "bg-gradient-to-br from-[#1a1a1d] via-[#3c3c43] to-[#0f0e13] shadow-2xl border border-gray-700"
    : "bg-white border border-gray-200 shadow-xl";
};


  const isFormValid = CurrentAccount && FormData.addressTo && FormData.amount && FormData.keyword && FormData.message;
 const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <div className="flex max-md:flex-col w-full justify-center items-center">
      <div className="flex flex-1 justify-start flex-col md:mr-10">
        <h1 className="text-3xl sm:text-5xl text-white dark:text-white text-gray-900 text-gradient py-10">
          Send Crypto <br /> Across the world
        </h1>
        <p className={`text-left mt-5 font-light md:w-9/12 w-11/12 text-base transition-colors duration-300 ${
          theme === 'dark' ? 'text-white' : 'text-gray-700'
        }`}>
          <span className="inline-block animate-pulse"></span> Explore the crypto world. Buy and sell cryptocurrencies easily on Krypto. <span className="inline-block animate-pulse delay-150"></span>
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

        <div className="grid max-md:hidden sm:grid-cols-3 grid-cols-2 w-full my-10 gap-2">
          <div className={`rounded-tl-2xl ${companyCommonStyles} ${
            theme === 'dark' 
              ? 'border-gray-400 text-white hover:bg-white/5' 
              : 'border-gray-300 text-gray-900 hover:bg-gray-100'
          }`}>Reliability</div>
          <div className={`${companyCommonStyles} ${
            theme === 'dark' 
              ? 'border-gray-400 text-white hover:bg-white/5' 
              : 'border-gray-300 text-gray-900 hover:bg-gray-100'
          }`}>Security</div>
          <div className={`sm:rounded-tr-2xl ${companyCommonStyles} ${
            theme === 'dark' 
              ? 'border-gray-400 text-white hover:bg-white/5' 
              : 'border-gray-300 text-gray-900 hover:bg-gray-100'
          }`}>Ethereum</div>
          <div className={`sm:rounded-bl-2xl ${companyCommonStyles} ${
            theme === 'dark' 
              ? 'border-gray-400 text-white hover:bg-white/5' 
              : 'border-gray-300 text-gray-900 hover:bg-gray-100'
          }`}>Web 3.0</div>
          <div className={`${companyCommonStyles} ${
            theme === 'dark' 
              ? 'border-gray-400 text-white hover:bg-white/5' 
              : 'border-gray-300 text-gray-900 hover:bg-gray-100'
          }`}>Low Fees</div>
          <div className={`rounded-br-2xl ${companyCommonStyles} ${
            theme === 'dark' 
              ? 'border-gray-400 text-white hover:bg-white/5' 
              : 'border-gray-300 text-gray-900 hover:bg-gray-100'
          }`}>Blockchain</div>
        </div>
      </div>

      <div className="flex flex-col  flex-1 items-center justify-start w-full md:mt-0 mt-10">

         <div
      onClick={() => setFlipped(state => !state)}
       className="relative cursor-pointer w-[300px] h-[220px] max-w-full sm:w-[280px] md:w-[300px]"
>
 
      <animated.div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: opacity.to(o => 1 - o),
          transform,
          background: "gradient-bg-welcome",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <animated.div
        className={`p-3 flex justify-end    items-start flex-col h-10/12  w-full max-[200px]:w-9/12  rounded-2xl  shadow-2xl  cursor-pointer ${getCardClasses()}`}
        style={{
          transform: props.rotateX
            .to((x) => `perspective(600px) rotateX(${x}deg) rotateY(${props.rotateY.get()}deg) scale(${props.scale.get()})`)
        }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = (e.clientY - rect.top - rect.height / 2) / 10;
          const y = (e.clientX - rect.left - rect.width / 2) / 10;
          set.start({ rotateX: -x, rotateY: y, scale: 1.05 });
        }}
        onMouseLeave={() => set.start({ rotateX: 0, rotateY: 0, scale: 1 })}
      >
       
          <div className="flex justify-between flex-col w-full h-full">
            <div className="flex justify-between  items-start gap-3 ">
              <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                <SiEthereum fontSize={21} color="#d0d0d0" />
              </div>
              <MdOutlineRefresh className={`flex ml-auto ${theme === 'dark' ? 'text-white' : 'text-black'} cursor-pointer hover:text-gray-300 transition-colors ${isaccountChanged ? 'animate-spin' : ''}`} onClick={async (e) => { 
                e.stopPropagation();
                setisaccountChanged(true)
                await checkifWalletIsConnected();
                await refreshBalance();
                setTimeout(() => {
                  setisaccountChanged(false)
                }, 1000);
              }} fontSize={19} />
              <BsInfoCircle fontSize={17} color="#bfbfbf" />
            </div>
            <div>
              <p className={`bg-clip-text text-transparent font-light text-sm truncate tracking-wide ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-600' 
                  : 'bg-gradient-to-r from-yellow-600 via-amber-700 to-yellow-800'
              }`}>
                {CurrentAccount || "Connect Wallet"}
              </p>
              <p className={`text-transparent bg-clip-text font-semibold text-lg mt-1 ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-white via-gray-200 to-white' 
                  : 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900'
              }`}>
                Ethereum
              </p>
              {CurrentAccount && (
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-emerald-400 to-green-500 dark:from-green-300 dark:via-emerald-400 dark:to-green-500 from-green-600 via-emerald-700 to-green-800 font-bold text-xl mt-2">
                  {balance ? `${parseFloat(balance).toFixed(4)} ETH` : "Loading..."}
                </p>
              )}
          </div>
        </div>
      </animated.div>

      </animated.div>

      <animated.div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity,
          transform,
          rotateY: "180deg",
          background: "gradient-bg-welcome",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
       <animated.div
        className={`p-3 flex justify-end    items-start flex-col h-10/12  w-full max-[200px]:w-9/12  rounded-2xl  shadow-2xl  cursor-pointer ${getCardClasses()}`}
        style={{
          transform: props.rotateX
            .to((x) => `perspective(600px) rotateX(${x}deg) rotateY(${props.rotateY.get()}deg) scale(${props.scale.get()})`)
        }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = (e.clientY - rect.top - rect.height / 2) / 10;
          const y = (e.clientX - rect.left - rect.width / 2) / 10;
          set.start({ rotateX: -x, rotateY: y, scale: 1.05 });
        }}
        onMouseLeave={() => set.start({ rotateX: 0, rotateY: 0, scale: 1 })}
      >
       
          <div className="flex justify-between flex-col w-full h-full">
            <div className="flex justify-between  items-start gap-3 ">
              <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                <SiEthereum fontSize={21} color={"#d0d0d0"} />
              </div>
              <MdOutlineRefresh className={`flex ml-auto ${theme === 'dark' ? 'text-white' : 'text-black'} cursor-pointer hover:text-gray-300 transition-colors ${isaccountChanged ? 'animate-spin' : ''}`} onClick={async (e) => { 
                e.stopPropagation();
                setisaccountChanged(true)
                await checkifWalletIsConnected();
                await refreshBalance();
                setTimeout(() => {
                  setisaccountChanged(false)
                }, 1000);
              }} fontSize={19} />
              <BsInfoCircle fontSize={17} color="#bfbfbf" />
            </div>
            <div>
              <p className={`bg-clip-text text-transparent font-light text-sm truncate tracking-wide ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-600' 
                  : 'bg-gradient-to-r from-yellow-600 via-amber-700 to-yellow-800'
              }`}>
                {CurrentAccount || "Connect Wallet"}
              </p>
              <p className={`text-transparent bg-clip-text font-semibold text-lg mt-1 ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-white via-gray-200 to-white' 
                  : 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900'
              }`}>
                Ethereum
              </p>
              {CurrentAccount && (
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-emerald-400 to-green-500 dark:from-green-300 dark:via-emerald-400 dark:to-green-500 from-green-600 via-emerald-700 to-green-800 font-bold text-xl mt-2">
                  {balance ? `${parseFloat(balance).toFixed(4)} ETH` : "Loading..."}
                </p>
              )}
          </div>
        </div>
      </animated.div>

      </animated.div>
    </div>
 
      
        <div className={`p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism ${
          theme === 'light' ? 'text-gray-900' : 'text-white'
        }`}>
          <form className="w-full" onSubmit={handleSubmit}>
            <Input placeholder="Address To" name="addressTo" type="text" value={FormData.addressTo} handlechange={handlechange} />
            <Input placeholder="Amount (ETH)" name="amount" type="number" value={FormData.amount} handlechange={handlechange} />
            <Input placeholder="Keyword (Gif)" name="keyword" type="text" value={FormData.keyword} handlechange={handlechange} />
            <Input placeholder="Enter Message" name="message" type="text" value={FormData.message} handlechange={handlechange} />

            <div className={`h-[1px] w-full my-2 ${
              theme === 'dark' ? 'bg-gray-400' : 'bg-gray-300'
            }`} />

           {isLoading
              ? <Loader />
              : (
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={!isFormValid}
                  className={`w-full mt-2 p-2 rounded-full transition-all ${
                    isFormValid 
                      ? theme === 'dark'
                        ? 'bg-[#3d4f7c] hover:bg-[#4a5f8a] text-white cursor-pointer'
                        : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                      : 'opacity-50 cursor-not-allowed bg-gray-400 text-white'
                  }`}
                >
                  {!CurrentAccount ? 'Connect Wallet First' : 'Send now'}
                </button>
              )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
