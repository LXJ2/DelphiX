// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface Ihackathon {
    event Vote(string indexed team, string indexed track,address indexed user);
    event Stake(address indexed user, uint256 amount);


}