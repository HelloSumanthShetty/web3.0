import { HiMenuAlt4 } from "react-icons/hi"
import { AiOutlineClose } from "react-icons/ai"
import { FaEthereum } from "react-icons/fa"
import { FiLogOut } from "react-icons/fi"
import { IoWalletOutline } from "react-icons/io5"
import { BsSun, BsMoon } from "react-icons/bs"
import logo from "../../public/icon.svg"
import { useState, useContext, useRef, useEffect } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { useTheme } from "../context/ThemeContext";
import { shortenAddress } from "../utils/shortenAddress";
import toast from "react-hot-toast";

type NavItemProps = {
  title: string;
  classprops?: string;
  onClick?: () => void;
};

const NavItem = ({ title, classprops, onClick }: NavItemProps) => {
  return (
    <li
      className={`mx-4 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${classprops}`}
      onClick={onClick}
    >
      {title}
    </li>
  )
}

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

const Navbar = () => {
  const [togglemenu, settogglemenu] = useState<Boolean>(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { CurrentAccount, connectWallet, disconnectWallet, balance } = useContext(TransactionContext)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleConnect = async () => {
    try {
      await connectWallet()
    } catch (error) {
      toast.error("Failed to connect wallet")
    }
  }

  const handleDisconnect = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    disconnectWallet()
    setShowDropdown(false)
    settogglemenu(false)
  }

  return (
    <nav className="w-full flex justify-between items-center p-4" >
      <div className="flex items-center max-sm:-justify-end gap-4 cursor-pointer">
        <img src={logo} alt="logo" className="w-2/12" />
        <h1 className={` text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>ETHERYO</h1>
      </div>

      <ul className="md:flex hidden text-xl list-none flex-row items-center ml-auto flex-initial gap-4">
      
        <li>
        <li>
  <button
    onClick={toggleTheme}
    aria-label="Toggle theme"
    className="
      w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200
      text-gray-600 dark:text-gray-300
      hover:bg-black/5 dark:hover:bg-white/10
      active:scale-95
    "
  >
    {theme === 'dark' ? (
      <BsSun className="text-lg text-white" />
    ) : (
      <BsMoon className="text-lg text-black" />
    )}
  </button>
</li>

        </li>
        <NavItem
          title="Home"
          onClick={() => scrollToSection('home')}
        />
        <NavItem
          title="Services"
          onClick={() => scrollToSection('services')}
        />
        <NavItem
          title="Transactions"
          onClick={() => scrollToSection('transactions')}
        />
        <NavItem
          title="About"
          onClick={() => scrollToSection('about')}
        />

        {!CurrentAccount ? (
          <li
            className="bg-blue-500 py-2 px-6 mx-4 rounded-lg cursor-pointer hover:bg-blue-600 text-white transition-colors flex items-center gap-2"
            onClick={handleConnect}
          >
            <IoWalletOutline />
            Connect Wallet
          </li>
        ) : (
          <li className="mx-4 relative">
            <div
              className="bg-blue-500 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-600 transition-all flex items-center gap-2"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <FaEthereum />
              <span className="font-semibold">{shortenAddress(CurrentAccount)}</span>
            </div>

            {showDropdown && (
  <div
    ref={dropdownRef}
    className={`absolute right-0 mt-2 w-64 rounded-xl shadow-xl z-50 border backdrop-blur-xl ${
      theme === 'dark'
        ? 'blue-glassmorphism border-gray-700 text-white'
        : 'bg-white/40 border-white/60 text-gray-900 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]'
    }`}
    onClick={(e) => e.stopPropagation()}
  >
    <div
      className={`p-4 border-b ${
        theme === 'dark'
          ? 'border-gray-700'
          : 'border-white/60'
      }`}
    >
      <p
        className={`text-xs mb-1 ${
          theme === 'dark'
            ? 'text-gray-300'
            : 'text-gray-700'
        }`}
      >
        Connected Wallet
      </p>

      <p className="font-semibold text-sm">{shortenAddress(CurrentAccount)}</p>

      {balance && (
        <p className="text-green-600 font-bold text-lg mt-2">
          {parseFloat(balance).toFixed(4)} ETH
        </p>
      )}
    </div>

    <div className="p-2">
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDisconnect(e);
        }}
        className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-colors cursor-pointer ${
          theme === 'dark'
            ? 'text-red-400 hover:bg-red-500/10'
            : 'text-red-500 hover:bg-red-100/50'
        }`}
        type="button"
      >
        <FiLogOut />
        <span>Disconnect Wallet</span>
      </button>
    </div>
  </div>
)}

          </li>
        )}
      </ul>

      <div className="flex relative">
        {!togglemenu && (
          <HiMenuAlt4 fontSize={28} className={`md:hidden cursor-pointer ${theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`} onClick={() => settogglemenu(true)} />
        )}
        {togglemenu && (
          <AiOutlineClose fontSize={28} className={`md:hidden cursor-pointer ${theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`} onClick={() => settogglemenu(false)} />
        )}
        {togglemenu && (
          <ul className={`z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-end rounded-md animate-slide-in ${
            theme === 'dark'
              ? 'blue-glassmorphism text-white'
              : 'bg-white text-gray-900'
            }`}>
            <li className="text-xl w-full my-2">
              <AiOutlineClose fontSize={28} className={`md:hidden cursor-pointer ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`} onClick={() => settogglemenu(false)} />
            </li>
            <NavItem
              title="Home"
              classprops="my-2 text-lg"
              onClick={() => {
                scrollToSection('home')
                settogglemenu(false)
              }}
            />
            <NavItem
              title="Services"
              classprops="my-2 text-lg"
              onClick={() => {
                scrollToSection('services')
                settogglemenu(false)
              }}
            />
            <NavItem
              title="Transactions"
              classprops="my-2 text-lg"
              onClick={() => {
                scrollToSection('transactions')
                settogglemenu(false)
              }}
            />
            <NavItem
              title="About"
              classprops="my-2 text-lg"
              onClick={() => {
                scrollToSection('about')
                settogglemenu(false)
              }}
            />
            {!CurrentAccount ? (
              <li
                className="bg-blue-500 text-white py-2 px-6 my-2 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors flex items-center gap-2"
                onClick={() => {
                  handleConnect()
                  settogglemenu(false)
                }}
              >
                <IoWalletOutline />
                Connect Wallet
              </li>
            ) : (
              <li
                className={`py-2 px-6 my-2 rounded-lg cursor-pointer transition-colors flex items-center gap-2 ${
                  theme === 'dark'
                    ? 'text-red-400 hover:bg-red-500/10'
                    : 'text-red-600 hover:bg-red-50'
                  }`}
                onClick={(e) => {
                  handleDisconnect(e)
                  settogglemenu(false)
                }}
              >
                <FiLogOut />
                Disconnect
              </li>
            )}
          </ul>
        )}
      </div>
    </nav>
  )
}

export default Navbar