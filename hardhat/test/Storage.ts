const { expect } = require("chai");

describe("Storage contract", function () {
  async function deployStorageFixture() {
    const Storage = await ethers.getContractFactory("Storage");
    const [owner, addr1, addr2] = await ethers.getSigners();

    const storage = await Storage.connect(owner).deploy();

    await storage.deployed();

    return { storage, owner, addr1, addr2 };
  }
}
);