import {HiMenuAlt4} from "react-icons/hi"
import { AiOutlineClose } from "react-icons/ai"
import logo from "../../images/logo.png"
import { useState } from "react";
type NavItemProps = {
  title: string;
  classprops?: string;
};
const NavItem= ({title,classprops}:NavItemProps)=>{
  return(
  <li className={`mx-4 cursor-pointer ${classprops}`}>
    {title}
  </li>
  )

}
const Navbar = () => {
  const [togglemenu, settogglemenu] = useState<Boolean>(false)
  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4" >
 <div className="md:flex-[0.5] flex-initial justify-center items-center">
 <img src={logo} alt="logo" className="w-32 cursor-pointer" />
 </div>
 <ul className="text-white md:flex hidden list-none flex-row  items-center flex-initial ">
 {["Market","Exchange","Tutorial","Wallets"].map((items,index) => (
  <NavItem key={items+index } title={items}/>   ) )}
  <li className="bg-blue-400 py-2 px-6 mx-4  rounded-lg  cursor-pointer  hover:bg-[#2546bd]">
    Login
  </li>
  
  </ul>
  

    <div className="flex relative">
        {!togglemenu && (
          <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => settogglemenu(true)} />
        )}
        {togglemenu && (
          <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => settogglemenu(false)} />
        )}  
  {togglemenu &&(
    <ul className="z-10 fixed  top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex flex-col  justify-start  items-end rounded-md  blue-glassmorphism text-white animate-slide-in">
      <li className="text-xl w-full my-2">
        <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer " onClick={()=>settogglemenu(false)}/>
    
      </li>
      {["Market","Exchange","Tutorial","Wallets"].map((items,index) => (
  <NavItem key={items+index } title={items} classprops="my-2 text-lg" />   ) )}
    </ul>
  )

  }
</div>

    </nav>
  )
}

export default Navbar