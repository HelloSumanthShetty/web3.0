
const main= async() =>{

const Transactions=await hre.ethers.getContractFactory("Transactions")  
const transaction = await Transactions.deploy();


  await transaction.deployed();

  console.log("Transaction deployed to:", transaction.address);
}

const runMain= async()=>{
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

runMain();