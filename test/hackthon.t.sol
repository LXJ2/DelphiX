// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import "../src/hackthon.sol";

contract HackthonTest is Test {
    


    function testHackthon() public {
        vm.startPrank(address(0x123));

        

        vm.stopPrank();
    }
}