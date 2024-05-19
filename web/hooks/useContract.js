/*
 * @Author: lxj 1851816672@qq.com
 * @Date: 2023-12-31 02:17:20
 * @LastEditors: lxj 1851816672@qq.com
 * @LastEditTime: 2024-05-11 01:54:02
 * @FilePath: /Swap/hooks/useContract.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ethers } from "ethers"
import { useEffect, useState } from "react"
import { useNetwork } from "wagmi"
import hackathonABI from '../contracts/hackathon.json'
import TokenABI from '../contracts/Token.json'


// const  hackathonCON= "0xb59Bd469951283Ed5A36CFC0650A9Ae1b28Db557";
const  hackathonCON= "0xBfA61C3573b7bc6EC459514F7df1951127112154";
const  USDTCON= "0x18c160daA467461CcBF2cbbd8C2D3b3D56F22522";
// let provider = new ethers.BrowserProvider(window.ethereum)
// const contractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
// const contract = new ethers.Contract(contractAddress, ABI, await provider.getSigner());


export const stakeWeb = async (track, team, amount) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log("provider", provider.getSigner())
    const hackathoncontract = new ethers.Contract(hackathonCON, hackathonABI, await provider.getSigner());
    console.log("hackathoncontract", hackathoncontract)
    console.log("track", track)
    console.log("team", team)
    console.log("amount", amount)
    const bool = await hackathoncontract.stake(track, team, amount)
    console.log("stake success")
    return bool
}


export const claimWeb = async (track) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log("provider", provider.getSigner())
    const hackathoncontract = new ethers.Contract(hackathonCON, hackathonABI, await provider.getSigner());
    const price = await hackathoncontract.claim(track)
    console.log("claim success")
    return price
}

export const settleWinnerPriceWeb = async (track,user) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log("provider", provider.getSigner())
    const hackathoncontract = new ethers.Contract(hackathonCON, hackathonABI, await provider.getSigner());
    const price = await hackathoncontract.settleWinnerPrice(track,user)
    // console.log("claim success")
    return price
}
