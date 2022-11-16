const { expect } = require("chai");
import { ethers } from "hardhat";

describe("Marketplace contract", function () {
    async function deployMarketplaceFixture() {
        const Marketplace = await ethers.getContractFactory("Marketplace");
        const [owner, addr1, addr2] = await ethers.getSigners();

        const marketplace = await Marketplace.connect(owner).deploy();

        await marketplace.deployed();

        const Experiment = await ethers.getContractFactory("Experiment");
        const experiment = await Experiment.deploy(marketplace.address);
        const Vial = await ethers.getContractFactory("Vial");
        const vial = await Vial.deploy(marketplace.address);

        await experiment.deployed();
        await vial.deployed();

        return { marketplace, experiment, vial, owner, addr1, addr2 };
    }

    it("Should create and execute market sales", async function () {
        const { marketplace, experiment } = await deployMarketplaceFixture();

        // Create NFT
        await experiment.mintToken("https://www.mytokenURI.com");
        await experiment.mintToken("https://www.mytokenURI2.com");


        await marketplace.createMarketItem(
            experiment.address,
            1,
            ethers.utils.parseUnits("1", "ether")
        );

        await marketplace.createMarketItem(
            experiment.address,
            2,
            ethers.utils.parseUnits("1", "ether")
        );


        let items = await marketplace.fetchAvailableMarketItems();
        expect(items.length).to.equal(2);

        const item = await marketplace.getLatestMarketItemByTokenId(1);
        expect(item[0].price).to.equal(ethers.utils.parseUnits("1", "ether"));

        await marketplace.createMarketSale(
            experiment.address,
            1,
            { value: ethers.utils.parseUnits("1", "ether") }
        );

        items = await marketplace.fetchAvailableMarketItems();
        expect(items.length).to.equal(1);

        await marketplace.createMarketSale(
            experiment.address,
            2,
            { value: ethers.utils.parseUnits("1", "ether") }
        );

        items = await marketplace.fetchAvailableMarketItems();
        expect(items.length).to.equal(0);
    });

    it("Should create vials, transfer them to the payer and send eth to the marketplace", async function () {
        const { marketplace, vial, addr1 } = await deployMarketplaceFixture();

        const vialPrice = ethers.utils.parseEther("0.001")
        await vial.connect(addr1).mintVials("https://www.mytokenURI.com", 10, { value: vialPrice });
        const vials = await vial.connect(addr1).getVialsOwnedByMe();
        expect(vials.length).to.equal(10);
        const marketplaceBalance = await ethers.provider.getBalance(marketplace.address);
        expect(marketplaceBalance).to.equal(vialPrice);
    })

    it("Should create NFTs and return their URIs", async function () {
        const { experiment } = await deployMarketplaceFixture();

        await experiment.mintToken("https://www.mytokenURI.com");
        await experiment.mintToken("https://www.mytokenURI2.com");
        const myTokenIds = await experiment.getTokensOwnedByMe();

        const uri_one = await experiment.getTokenURI(myTokenIds[0]);
        const uri_two = await experiment.getTokenURI(myTokenIds[1]);
        expect(uri_one.tokenId).to.equal(ethers.BigNumber.from(1));
        expect(uri_two.tokenId).to.equal(ethers.BigNumber.from(2));
        expect(uri_one.tokenURI).to.equal("https://www.mytokenURI.com");
        expect(uri_two.tokenURI).to.equal("https://www.mytokenURI2.com");

        const uris = await experiment.getTokenURIs(myTokenIds);
        expect(uris[0].tokenId).to.equal(ethers.BigNumber.from(1));
        expect(uris[1].tokenId).to.equal(ethers.BigNumber.from(2));
        expect(uris[0].tokenURI).to.equal("https://www.mytokenURI.com");
        expect(uris[1].tokenURI).to.equal("https://www.mytokenURI2.com");
    })
    it("Should create vials and burn them", async function () {
        const { vial, addr1 } = await deployMarketplaceFixture();
        const vialPrice = ethers.utils.parseEther("0.001")
        await vial.connect(addr1).mintVials("https://www.mytokenURI.com", 10, { value: vialPrice });
        let vials = await vial.connect(addr1).getVialsOwnedByMe();
        expect(vials.length).to.equal(10);
        await vial.connect(addr1).burnVial(vials[0]);
        await vial.connect(addr1).burnVial(vials[1]);
        await vial.connect(addr1).burnVial(vials[2]);
        vials = await vial.connect(addr1).getVialsOwnedByMe();
        expect(vials.length).to.equal(7);
    })
    it("Should airdrop vials to selected address", async function () {
        const { vial, owner, addr1 } = await deployMarketplaceFixture();
        await vial.connect(owner).airdropVials("https://www.mytokenURI.com", 10, addr1.address);
        let vials = await vial.connect(addr1).getVialsOwnedByMe();
        expect(vials.length).to.equal(10);
        expect(vial.connect(addr1).airdropVials("https://www.mytokenURI.com", 10, owner.address)).to.be.revertedWith("Ownable: caller is not the owner");
    })
});