import { ethers } from "hardhat";
const hre = require("hardhat");
const fs = require("fs");

export const baseURI = "https://myURI.com/"

async function main() {

  const Marketplace = await hre.ethers.getContractFactory("Marketplace");
  console.log("Deploying Marketplace...");
  const marketplace = await Marketplace.deploy();
  console.log("Marketplace deployed to:", `https://testnet.aurorascan.dev/address/${marketplace.address}`);

  await marketplace.deployed();

  const marketplaceData = {
    address: marketplace.address,
    abi: JSON.parse(marketplace.interface.format('json'))
  }

  //This writes the ABI and address to the mktplace.json
  fs.writeFileSync('../frontend/src/abi/marketplace.json', JSON.stringify(marketplaceData))

  const Experiment = await hre.ethers.getContractFactory("Experiment");
  console.log("Deploying Experiment...");
  const experiment = await Experiment.deploy(marketplace.address);
  console.log("Experiment deployed to:", `https://testnet.aurorascan.dev/address/${experiment.address}`);
  const Vial = await hre.ethers.getContractFactory("Vial");
  console.log("Deploying Vial...");
  const vial = await Vial.deploy(marketplace.address);
  console.log("Vial deployed to:", `https://testnet.aurorascan.dev/address/${vial.address}`);

  await experiment.deployed();
  await vial.deployed();

  const experimentData = {
    address: experiment.address,
    abi: JSON.parse(experiment.interface.format('json'))
  }

  const vialData = {
    address: vial.address,
    abi: JSON.parse(vial.interface.format('json'))
  }

  //This writes the ABI and address to the mktplace.json
  fs.writeFileSync('../frontend/src/abi/experiment.json', JSON.stringify(experimentData))
  fs.writeFileSync('../frontend/src/abi/vial.json', JSON.stringify(vialData))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
