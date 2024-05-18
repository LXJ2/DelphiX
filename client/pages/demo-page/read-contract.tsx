'use client'

import {createConfig, http, useReadContract} from "wagmi";
import {mainnet} from "wagmi/chains";
import {WagmiWeb3ConfigProvider, MetaMask} from "@ant-design/web3-wagmi";
import {useAccount} from "@ant-design/web3";
import {injected} from "wagmi/connectors";

const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
  connectors: [
    injected({
      target: "metaMask",
    }),
  ],
});

const CallTest = () => {
  const {account} = useAccount();
  const result = useReadContract({
    abi: [
      {
        type: 'function',
        name: 'balanceOf',
        stateMutability: 'view',
        inputs: [{name: 'account', type: 'address'}],
        outputs: [{type: 'uint256'}],
      },
    ],
    address: '0xEcd0D12E21805803f70de03B72B1C162dB0898d9',
    functionName: 'balanceOf',
    args: [account?.address as `0x${string}`],
  });
  return (
    <div>{result.data?.toString()}</div>
  );
}

export default function Page() {
  return (
    <>
      <WagmiWeb3ConfigProvider config={config} wallets={[MetaMask()]}>
        <CallTest/>
      </WagmiWeb3ConfigProvider>
    </>
  );
}