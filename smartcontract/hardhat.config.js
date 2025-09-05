//https://eth-sepolia.g.alchemy.com/v2/ncmwkLG7XwCnsnSj7zTp5


require("@nomiclabs/hardhat-waffle");

module.exports={
  solidity:"0.8.0",
  networks:{
    sepolia:{
      url:`https://eth-sepolia.g.alchemy.com/v2/ncmwkLG7XwCnsnSj7zTp5`,
      accounts:[`07dbbd536149b84df379de3b299b598806ba8ab761c79340e06ebab009ee78c0`]
    }
  }

}