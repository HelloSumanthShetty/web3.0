import React, { useContext,useState } from "react";
import { MdOutlineRefresh } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { SiEthereum } from "react-icons/si";
import { TransactionContext } from "../context/TransactionContext";
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
      const [flipped, setFlipped] = useState(false);
  const { connectWallet, isLoading, CurrentAccount, FormData, handlechange, checkifWalletIsConnected, sendTransaction } = useContext(TransactionContext);

  const [props, set] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    config: { mass: 5, tension: 350, friction: 40 },
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendTransaction();
  };
 const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <div className="flex max-md:flex-col w-full justify-center items-center">
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

        <div className="grid max-md:hidden sm:grid-cols-3 grid-cols-2 w-full my-10">
          <div className={`rounded-tl-2xl ${companyCommonStyles}`}>Reliability</div>
          <div className={companyCommonStyles}>Security</div>
          <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>Ethereum</div>
          <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>Web 3.0</div>
          <div className={companyCommonStyles}>Low Fees</div>
          <div className={`rounded-br-2xl ${companyCommonStyles}`}>Blockchain</div>
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
        className="p-3 flex justify-end    items-start flex-col h-10/12  w-full max-[200px]:w-9/12  bg-gradient-to-br from-[#1a1a1d] via-[#3c3c43] to-[#0f0e13] rounded-2xl  shadow-2xl  cursor-pointer"
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
              <MdOutlineRefresh className={`flex ml-auto text-neutral-900 ${isaccountChanged ? 'animate-spin' : ''}`} onClick={() => { 
                setisaccountChanged(true)
                checkifWalletIsConnected();
                setTimeout(() => {
                  setisaccountChanged(false)
                }, 1000);
              }} fontSize={19} />
              <BsInfoCircle fontSize={17} color="#bfbfbf" />
            </div>
            <div>
              <p className="bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-600 bg-clip-text text-transparent font-light text-sm truncate tracking-wide">{CurrentAccount}</p>
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-white font-semibold text-lg mt-1 ">Ethereum</p>
            
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
        className="p-3 flex justify-end    items-start flex-col h-10/12  w-full max-[200px]:w-9/12  bg-gradient-to-br from-[#1a1a1d] via-[#3c3c43] to-[#0f0e13] rounded-2xl  shadow-2xl  cursor-pointer"
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
              <MdOutlineRefresh className={`flex ml-auto text-neutral-900 ${isaccountChanged ? 'animate-spin' : ''}`} onClick={() => { 
                setisaccountChanged(true)
                checkifWalletIsConnected();
                setTimeout(() => {
                  setisaccountChanged(false)
                }, 1000);
              }} fontSize={19} />
              <BsInfoCircle fontSize={17} color="#bfbfbf" />
            </div>
            <div>
              <p className="bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-600 bg-clip-text text-transparent font-light text-sm truncate tracking-wide">{CurrentAccount}</p>
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-white font-semibold text-lg mt-1 ">Ethereum</p>
            
          </div>
        </div>
      </animated.div>

      </animated.div>
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
                  type="submit"
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
