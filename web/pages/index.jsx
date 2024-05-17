/*
 * @Author: lxj 1851816672@qq.com
 * @Date: 2024-01-02 22:05:01
 * @LastEditors: lxj 1851816672@qq.com
 * @LastEditTime: 2024-05-17 17:43:22
 * @FilePath: /TheLastOneGame/pages/winner.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useContracts } from '@/hooks/useContract';
import { useAccount, useNetwork } from 'wagmi'
import { convertToWei, calculateCountdown, weiToEth } from '@/assets/utils'

const Home = () => {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const [isDisabled, setIsDisabled] = useState(true)


  return (
    <div>home</div>
  )
}

export default Home