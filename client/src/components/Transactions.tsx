import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { useTheme } from "../context/ThemeContext";
import { shortenAddress } from "../utils/shortenAddress";
import { getExplorerUrl } from "../utils/constant";
import { 
  FaEthereum, 
  FaArrowRight, 
  FaClock, 
  FaCopy,
  FaExternalLinkAlt 
} from "react-icons/fa";
import { HiArrowUpRight, HiArrowDownLeft } from "react-icons/hi2";

interface TransactionProps {
  addressTo: string;
  addressFrom: string;
  timestamp: string;
  message: string;
  keyword: string;
  amount: string;
  url: string;
}

const TransactionsCard = ({
  addressTo,
  addressFrom,
  timestamp,
  message,
  amount,
}: TransactionProps) => {
  const { chainId, CurrentAccount } = useContext(TransactionContext);
  const { theme } = useTheme();
  const explorerUrl = chainId ? getExplorerUrl(chainId) : 'https://etherscan.io';
  const isOutgoing = CurrentAccount?.toLowerCase() === addressFrom?.toLowerCase();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className={`group relative rounded-xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-[#1a1a1d] via-[#2a2a2d] to-[#1a1a1d] border border-gray-800 hover:border-blue-500/50' 
        : 'bg-white border border-gray-200 hover:border-blue-400 shadow-md'
    }`}>
      <div className="absolute top-4 right-4">
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
          isOutgoing 
            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
            : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
        }`}>
          {isOutgoing ? (
            <>
              <HiArrowUpRight className="text-sm" />
              <span>Sent</span>
            </>
          ) : (
            <>
              <HiArrowDownLeft className="text-sm" />
              <span>Received</span>
            </>
          )}
        </div>
      </div>

      {/* Amount Section */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <FaEthereum className="text-white text-xl" />
          </div>
          <div>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Amount</p>
            <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {parseFloat(amount).toFixed(4)} <span className="text-blue-400 dark:text-blue-400 text-blue-600">ETH</span>
            </p>
          </div>
        </div>
      </div>

   
      <div className="space-y-4 mb-6">
  
        <div className={`rounded-lg p-4 border ${
          theme === 'dark' 
            ? 'bg-black/30 border-gray-800' 
            : 'bg-gray-50 border-gray-200'
        }`}>
          <p className={`text-xs mb-2 flex items-center gap-2 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <span className="w-2 h-2 rounded-full bg-red-400"></span>
            From
          </p>
          <div className="flex items-center justify-between">
            <a
              href={`${explorerUrl}/address/${addressFrom}`}
              target="_blank"
              rel="noreferrer"
              className={`font-mono text-sm hover:text-blue-400 dark:hover:text-blue-400 hover:text-blue-600 transition-colors flex items-center gap-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              {shortenAddress(addressFrom)}
              <FaExternalLinkAlt className="text-xs opacity-50" />
            </a>
            <button
              onClick={() => copyToClipboard(addressFrom)}
              className={`transition-colors p-1 ${
                theme === 'dark' 
                  ? 'text-gray-500 hover:text-white' 
                  : 'text-gray-400 hover:text-gray-700'
              }`}
              title="Copy address"
            >
              <FaCopy className="text-xs" />
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
            <FaArrowRight className="text-blue-400 text-sm" />
          </div>
        </div>

        <div className={`rounded-lg p-4 border ${
          theme === 'dark' 
            ? 'bg-black/30 border-gray-800' 
            : 'bg-gray-50 border-gray-200'
        }`}>
          <p className={`text-xs mb-2 flex items-center gap-2 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
            To
          </p>
          <div className="flex items-center justify-between">
            <a
              href={`${explorerUrl}/address/${addressTo}`}
              target="_blank"
              rel="noreferrer"
              className={`font-mono text-sm hover:text-blue-400 dark:hover:text-blue-400 hover:text-blue-600 transition-colors flex items-center gap-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              {shortenAddress(addressTo)}
              <FaExternalLinkAlt className="text-xs opacity-50" />
            </a>
            <button
              onClick={() => copyToClipboard(addressTo)}
              className={`transition-colors p-1 ${
                theme === 'dark' 
                  ? 'text-gray-500 hover:text-white' 
                  : 'text-gray-400 hover:text-gray-700'
              }`}
              title="Copy address"
            >
              <FaCopy className="text-xs" />
            </button>
          </div>
        </div>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg border ${
          theme === 'dark' 
            ? 'bg-blue-500/10 border-blue-500/20' 
            : 'bg-blue-50 border-blue-200'
        }`}>
          <p className={`text-xs mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Message</p>
          <p className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{message}</p>
        </div>
      )}

      {/* Timestamp */}
      <div className={`flex items-center justify-between pt-4 border-t ${
        theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
      }`}>
        <div className={`flex items-center gap-2 text-xs ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          <FaClock />
          <span>{timestamp}</span>
        </div>
        <a
          href={`${explorerUrl}/address/${addressFrom}`}
          target="_blank"
          rel="noreferrer"
          className="text-blue-400 hover:text-blue-300 text-xs flex items-center gap-1 transition-colors"
        >
          View on Explorer
          <FaExternalLinkAlt className="text-xs" />
        </a>
      </div>
    </div>
  );
};

const Transactions = () => {
  const { CurrentAccount, transactions } = useContext(TransactionContext);
  const { theme } = useTheme();

  return (
    <div id="transactions" className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions min-h-screen">
      <div className="flex flex-col md:p-12 py-12 px-4 w-full max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          {CurrentAccount ? (
            <>
              <h2 className={`text-4xl sm:text-5xl font-bold mb-4 text-gradient ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Transaction History
              </h2>
              <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                View all your blockchain transactions
              </p>
              {transactions.length > 0 && (
                <div className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                  theme === 'dark' 
                    ? 'bg-blue-500/20 border border-blue-500/30' 
                    : 'bg-blue-100 border border-blue-300'
                }`}>
                  <span className="text-blue-400 dark:text-blue-400 text-blue-600 font-semibold">{transactions.length}</span>
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Total Transactions</span>
                </div>
              )}
            </>
          ) : (
            <>
              <h2 className={`text-4xl sm:text-5xl font-bold mb-4 text-gradient ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Transaction History
              </h2>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Connect your wallet to view your transaction history
              </p>
              <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full border ${
                theme === 'dark' 
                  ? 'bg-gray-800/50 border-gray-700' 
                  : 'bg-gray-100 border-gray-300'
              }`}>
                <FaEthereum className={`text-4xl ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} />
              </div>
            </>
          )}
        </div>

        
        {CurrentAccount && transactions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[...transactions].reverse().map((transaction, i) => (
              <TransactionsCard key={i} {...transaction} />
            ))}
          </div>
        ) : CurrentAccount && transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className={`w-32 h-32 rounded-full border flex items-center justify-center mb-6 ${
              theme === 'dark' 
                ? 'bg-gray-800/50 border-gray-700' 
                : 'bg-gray-100 border-gray-300'
            }`}>
              <FaEthereum className={`text-5xl ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} />
            </div>
            <h3 className={`text-2xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>No Transactions Yet</h3>
            <p className={`text-center max-w-md ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Your transaction history will appear here once you make your first transaction.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Transactions;
