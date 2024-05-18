// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
contract Token is ERC20, Ownable{

    constructor() ERC20("DelphiX", "DELX")Ownable(msg.sender){
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner{
        _mint(to, amount);
    }
    
    function burn(address from, uint256 amount) public onlyOwner{
        _burn(from, amount);
    }
    
}