// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";

import "../src/hackthon.sol";

contract HackthonTest is Test {
    hackthonProject public hackthon;

    address admin = makeAddr("admin");
    address alice = makeAddr("alice");
    address bob = makeAddr("bob");
    address david = makeAddr("david");
    address leo = makeAddr("leo");

    address factory = makeAddr("factory");

    string[] _tracks;
    uint256[] _team;
    uint256 _ENDTIME;
    uint256 _STOPTIME;
    address _usdt;
    address[] _adminList;

    function setUp() public {
        vm.startPrank(admin);
        hackthon = new hackthonProject();
        hackthon.setFactory(factory);
        vm.stopPrank();

        _tracks =
            [
                "track1",
                "track2",
                "track3",
                "track4"
            ];
        _team = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        _ENDTIME = block.number+50;
        _STOPTIME = 60;
        _usdt = 0xf55BEC9cafDbE8730f096Aa55dad6D22d44099Df;
        _adminList = [admin,bob];

        vm.startPrank(factory);
        hackthon.init(_tracks, _team, _ENDTIME, _STOPTIME, _usdt, _adminList);
        vm.stopPrank();

    }

    function testHackthon() public {
        vm.startPrank(alice);
        {
            IERC20(_usdt).approve(address(hackthon), 10 ether);
            hackthon.stake("track1",1, 4 ether);
        }
        vm.stopPrank();

        vm.startPrank(leo);
        {
            IERC20(_usdt).approve(address(hackthon), 10 ether);
            hackthon.stake("track1",1, 6 ether);
        }
        vm.stopPrank();

        vm.startPrank(bob);
        {
            IERC20(_usdt).approve(address(hackthon), 20 ether);
            hackthon.stake("track1",2, 20 ether);
        }
        vm.stopPrank();
        vm.startPrank(david);
        {
            IERC20(_usdt).approve(address(hackthon), 10 ether);
            hackthon.stake("track1",3,10 ether);
        }
        vm.stopPrank();

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

        console.log("alice:", IERC20(_usdt).balanceOf(alice));
        console.log("leo:", IERC20(_usdt).balanceOf(leo));

        assertEq(IERC20(_usdt).balanceOf(alice), 16 ether);
        assertEq(IERC20(_usdt).balanceOf(leo), 24 ether);

    }
}