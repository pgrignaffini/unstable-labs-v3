import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { baseURI } from "../scripts/deploy";

describe("Vial", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployVialFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Vial = await ethers.getContractFactory("VialERC1155");
    const vial = await Vial.deploy(baseURI);

    return { vial, baseURI, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { vial, owner } = await loadFixture(deployVialFixture);
      expect(await vial.owner()).to.equal(owner.address);
    });
  });

  describe("Minting", function () {
    it("Should mint number of tokens", async function () {
      const { vial, otherAccount } = await loadFixture(deployVialFixture);
      await vial.mint(otherAccount.address, 1, 10);
      expect(await vial.balanceOf(otherAccount.address, 1)).to.equal(10);
      let vials = await vial.connect(otherAccount).getVialsOwnedByMe();
      expect(vials.vialIds).to.deep.equal([1]);
      expect(vials.vialAmounts).to.deep.equal([10]);
      await vial.mint(otherAccount.address, 2, 8);
      expect(await vial.balanceOf(otherAccount.address, 2)).to.equal(8);
      vials = await vial.connect(otherAccount).getVialsOwnedByMe();
      expect(vials.vialIds).to.deep.equal([1, 2]);
      expect(vials.vialAmounts).to.deep.equal([10, 8]);
    });
    it("Should batch mint number of tokens", async function () {
      const { vial, otherAccount } = await loadFixture(deployVialFixture);
      expect(vial.connect(otherAccount).mintBatch(otherAccount.address, [1, 2], [10, 20])).to.be.revertedWith("Ownable: caller is not the owner");
      await vial.mintBatch(otherAccount.address, [1, 2], [10, 20]);
      let vials = await vial.connect(otherAccount).getVialsOwnedByMe();
      expect(vials.vialIds).to.deep.equal([1, 2]);
      expect(vials.vialAmounts).to.deep.equal([10, 20]);
    });
  });

  describe("Burning", function () {
    it("Should burn number of tokens", async function () {
      const { vial, otherAccount } = await loadFixture(deployVialFixture);
      await vial.mint(otherAccount.address, 1, 10);
      expect(await vial.balanceOf(otherAccount.address, 1)).to.equal(10);
      let vials = await vial.connect(otherAccount).getVialsOwnedByMe();
      expect(vials.vialIds).to.deep.equal([1]);
      expect(vials.vialAmounts).to.deep.equal([10]);
      await vial.connect(otherAccount).burn(otherAccount.address, 1, 1);
      expect(await vial.balanceOf(otherAccount.address, 1)).to.equal(9);
      vials = await vial.connect(otherAccount).getVialsOwnedByMe();
      expect(vials.vialIds).to.deep.equal([1]);
      expect(vials.vialAmounts).to.deep.equal([9]);
    });
    it("Should batch burn number of tokens", async function () {
      const { vial, otherAccount } = await loadFixture(deployVialFixture);
      await vial.mintBatch(otherAccount.address, [1, 2, 3], [10, 10, 10]);
      let vials = await vial.connect(otherAccount).getVialsOwnedByMe();
      expect(vials.vialIds).to.deep.equal([1, 2, 3]);
      expect(vials.vialAmounts).to.deep.equal([10, 10, 10]);
      await vial.connect(otherAccount).burnBatch(otherAccount.address, [1, 2, 3], [1, 2, 3]);
      expect(await vial.balanceOf(otherAccount.address, 1)).to.equal(9);
      vials = await vial.connect(otherAccount).getVialsOwnedByMe();
      expect(vials.vialIds).to.deep.equal([1, 2, 3]);
      expect(vials.vialAmounts).to.deep.equal([9, 8, 7]);
    });
  });
  describe("URIs", function () {
    it("Should return the right URI", async function () {
      const { vial, baseURI } = await loadFixture(deployVialFixture);
      expect(await vial.uri(1)).to.equal(baseURI + "1.json");
    });
    it("Should return the right URIs", async function () {
      const { vial, baseURI } = await loadFixture(deployVialFixture);
      expect(await vial.uris([1, 2, 3])).to.deep.equal([baseURI + "1.json", baseURI + "2.json", baseURI + "3.json"]);
    });
  });
});
