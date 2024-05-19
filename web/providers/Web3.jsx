/*
 * @Author: lxj 1851816672@qq.com
 * @Date: 2023-12-24 05:11:34
 * @LastEditors: lxj 1851816672@qq.com
 * @LastEditTime: 2024-05-18 04:34:13
 * @FilePath: /marketPlace/providers/Web3.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useEffect, useState } from "react"
import "@rainbow-me/rainbowkit/styles.css"
import { configureChains, createConfig, WagmiConfig, } from "wagmi"
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import {
  scroll,
  mainnet,
  optimism,
  polygon,
  zora
  

} from "@wagmi/chains"
import { publicProvider } from "wagmi/providers/public"

const scrollSepolia = {
  id: 534351,
  name: "Scroll Sepolia",
  network: "scroll-sepolia",
  nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
  },
  rpcUrls: {
      default: {
          http: ["https://sepolia-rpc.scroll.io"],
          webSocket: ["wss://sepolia-rpc.scroll.io/ws"],
      },
      public: {
          http: ["https://sepolia-rpc.scroll.io"],
          webSocket: ["wss://sepolia-rpc.scroll.io/ws"],
      },
  },
  blockExplorers: {
      default: {
          name: "Blockscout",
          url: "https://sepolia-blockscout.scroll.io",
      },
  },
  testnet: true,
};

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    scrollSepolia, 
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [scrollSepolia] : [])
  ],
  [publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: "Dapp Forge",
  projectId: "928c0944dc8279fb073a7405ecd6b657",
  chains
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient
})

export function Web3Provider(props) {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    setReady(true)
  }, [])
  return (
    <>
      {ready && (
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>
            {props.children}
          </RainbowKitProvider>
        </WagmiConfig>
      )}
    </>
  )
}