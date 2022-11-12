const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs");

async function main() {

  const Storage = await hre.ethers.getContractFactory("Storage");
  console.log("Deploying Storage...");
  const storage = await Storage.deploy();
  console.log("Storage deployed to:", storage.address);

  await storage.deployed();

  const storageData = {
    address: storage.address,
    abi: JSON.parse(storage.interface.format('json'))
  }

  //This writes the ABI and address to the mktplace.json
  fs.writeFileSync('../frontend/src/abi/storage.json', JSON.stringify(storageData))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
