// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";

import "../src/hackthon.sol";
import "../src/Token.sol";

contract HackthonTest is Test {
    hackthonProject public hackthon;

    address admin = makeAddr("admin");
    address alice = makeAddr("alice");
    address bob = makeAddr("bob");
    address david = makeAddr("david");
    address leo = makeAddr("leo");

    address factory = makeAddr("factory");

    string[] _tracks;
    string[] _team;
    uint256 _ENDTIME;
    uint256 _STOPTIME;
    Token usdx;
    address[] _adminList;

    function setUp() public {

        vm.startPrank(admin);
        hackthon = new hackthonProject();
        hackthon.setFactory(factory);
        usdx = new Token();
        Token(usdx).mint(alice,20 ether);
        Token(usdx).mint(bob,20 ether);
        Token(usdx).mint(david,20 ether);
        Token(usdx).mint(leo,20 ether);

        console.log("alice:", IERC20(usdx).balanceOf(alice));
        console.log("bob:", IERC20(usdx).balanceOf(bob));
        vm.stopPrank();

        _tracks =
            [
                "track1",
                "track2",
                "track3",
                "track4"
            ];
        _team = ["0", "1", "2", "3"];
        _ENDTIME = block.timestamp+700;
        _STOPTIME = 60;
        _adminList = [admin,bob];

        vm.startPrank(factory);
        hackthon.init(_tracks, _team, _ENDTIME, _STOPTIME, address(usdx), _adminList);
        vm.stopPrank();
    }

    function testHackthon() public {
        vm.startPrank(alice);
        {
            IERC20(usdx).approve(address(hackthon), 10 ether);
            hackthon.stake("track1","1", 4 ether);
        }
        vm.stopPrank();

        vm.startPrank(leo);
        {
            IERC20(usdx).approve(address(hackthon), 10 ether);
            hackthon.stake("track1","1", 6 ether);
        }
        vm.stopPrank();

        vm.startPrank(bob);
        {
            IERC20(usdx).approve(address(hackthon), 20 ether);
            hackthon.stake("track1","2", 20 ether);
        }
        vm.stopPrank();
        vm.startPrank(david);
        {
            IERC20(usdx).approve(address(hackthon), 10 ether);
            hackthon.stake("track1","3",10 ether);
        }
        vm.stopPrank();

        vm.warp(block.timestamp+710);

        vm.startPrank(admin);
        {
            hackthon.setHackthonResult("track1","1");
        }
        vm.stopPrank(); 

        vm.startPrank(alice);
        {
            hackthon.claim("track1");
        }
        vm.stopPrank();

        vm.startPrank(leo);
        {
            hackthon.claim("track1");
        }
        vm.stopPrank();

        console.log("alice:", IERC20(usdx).balanceOf(alice));
        console.log("leo:", IERC20(usdx).balanceOf(leo));

        // assertEq(IERC20(usdx).balanceOf(alice), 16 ether);
        // assertEq(IERC20(usdx).balanceOf(leo), 24 ether);

    }
}