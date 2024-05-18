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
    string[] _team;
    uint256 _ENDTIME;
    uint256 _STOPTIME;
    address _usdt;
    address[] _adminList;

    function setUp() public {
        _usdt = 0xf55BEC9cafDbE8730f096Aa55dad6D22d44099Df;

        deal(address(_usdt),admin, 1000000000000 ether);
        deal(address(_usdt),alice, 1000000000000 ether);
        deal(address(_usdt),david, 1000000000000 ether);
        deal(address(_usdt),leo, 1000000000000 ether);
        deal(address(_usdt),bob, 1000000000000 ether);

        console.log("alice:", IERC20(_usdt).balanceOf(alice));
        console.log("bob:", IERC20(_usdt).balanceOf(bob));

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
        _team = ["0", "1", "2", "3"];
        _ENDTIME = block.number+50;
        _STOPTIME = 60;
        _adminList = [admin,bob];

        vm.startPrank(factory);
        hackthon.init(_tracks, _team, _ENDTIME, _STOPTIME, _usdt, _adminList);
        vm.stopPrank();

    }

    function testHackthon() public {
        vm.startPrank(alice);
        {
            IERC20(_usdt).approve(address(hackthon), 10 ether);
            hackthon.stake("track1","1", 4 ether);
        }
        vm.stopPrank();

        vm.startPrank(leo);
        {
            IERC20(_usdt).approve(address(hackthon), 10 ether);
            hackthon.stake("track1","1", 6 ether);
        }
        vm.stopPrank();

        vm.startPrank(bob);
        {
            IERC20(_usdt).approve(address(hackthon), 20 ether);
            hackthon.stake("track1","2", 20 ether);
        }
        vm.stopPrank();
        vm.startPrank(david);
        {
            IERC20(_usdt).approve(address(hackthon), 10 ether);
            hackthon.stake("track1","3",10 ether);
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