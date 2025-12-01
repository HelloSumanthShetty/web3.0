import abi from "./Transaction.json"
export const contractAddress="0x32DDa5B20977e5CFE4672F57D9B29B134Ff7Ca7D";
export const constractABI=abi.abi;

// Network explorer URLs
export const getExplorerUrl = (chainId: number | string): string => {
  const chainIdNum = typeof chainId === 'string' ? parseInt(chainId, 16) : chainId;
  
  const explorerMap: { [key: number]: string } = {
    1: 'https://etherscan.io', // Mainnet
    3: 'https://ropsten.etherscan.io', // Ropsten
    4: 'https://rinkeby.etherscan.io', // Rinkeby
    5: 'https://goerli.etherscan.io', // Goerli
    11155111: 'https://sepolia.etherscan.io', // Sepolia
    137: 'https://polygonscan.com', // Polygon
    80001: 'https://mumbai.polygonscan.com', // Mumbai
  };

  return explorerMap[chainIdNum] || 'https://etherscan.io';
};