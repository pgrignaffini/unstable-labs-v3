// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract VialERC1155 is ERC1155, Ownable, ERC1155Burnable, ERC1155Supply {
    mapping(address => uint256[]) private _balances; // address => tokenIds
    string internal baseMetadataURI; // = https://ivory-absolute-antelope-563.mypinata.cloud/ipfs/QmavDnt4QWGqPFhFERMXgM9PabrYUeB1BvKzMvVcZ5WnWF/

    struct OwnedVials {
        uint256[] vialIds;
        uint256[] vialAmounts;
    }

    constructor(string memory _baseMetadataURI) ERC1155(_baseMetadataURI) {
        baseMetadataURI = _baseMetadataURI;
    }

    function setURI(string memory newuri) public onlyOwner {
        baseMetadataURI = newuri;
    }

    function uri(uint256 _id) public view override returns (string memory) {
        return
            string(
                abi.encodePacked(
                    baseMetadataURI,
                    Strings.toString(_id),
                    ".json"
                )
            );
    }

    function uris(uint256[] memory _ids) public view returns (string[] memory) {
        string[] memory urisData = new string[](_ids.length);
        for (uint256 i = 0; i < _ids.length; i++) {
            urisData[i] = uri(_ids[i]);
        }
        return urisData;
    }

    function mint(
        address account,
        uint256 id,
        uint256 amount
    ) public {
        _mint(account, id, amount, "");
        // check if balance already contains id
        bool contains = false;
        for (uint256 i = 0; i < _balances[account].length; i++) {
            if (_balances[account][i] == id) {
                contains = true;
            }
        }
        // if not, add it
        if (!contains) {
            _balances[account].push(id);
        }
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts
    ) public onlyOwner {
        _mintBatch(to, ids, amounts, "");
        // check if balance already contains id
        for (uint256 i = 0; i < ids.length; i++) {
            bool contains = false;
            for (uint256 j = 0; j < _balances[to].length; j++) {
                if (_balances[to][j] == ids[i]) {
                    contains = true;
                }
            }
            // if not, add it
            if (!contains) {
                _balances[to].push(ids[i]);
            }
        }
    }

    function getVialsOwnedByMe() public view returns (OwnedVials memory) {
        OwnedVials memory ownedVials;
        ownedVials.vialIds = _balances[msg.sender];
        uint256[] memory vialAmounts = new uint256[](
            _balances[msg.sender].length
        );
        for (uint256 i = 0; i < _balances[msg.sender].length; i++) {
            vialAmounts[i] = balanceOf(msg.sender, _balances[msg.sender][i]);
        }
        ownedVials.vialAmounts = vialAmounts;
        return ownedVials;
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155, ERC1155Supply) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
