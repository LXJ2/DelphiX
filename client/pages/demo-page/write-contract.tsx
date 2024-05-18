'use client'

import {createConfig, http, useWriteContract} from "wagmi";
import {Button, message} from "antd";
import {parseEther} from "viem";
import {mainnet} from "wagmi/chains";
import {WagmiWeb3ConfigProvider, MetaMask} from "@ant-design/web3-wagmi";
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
  const {writeContract} = useWriteContract();

  return (
    <div>
      <Button
        onClick={() => {
          writeContract(
            {
              abi: [
                {
                  type: 'function',
                  name: 'mint',
                  stateMutability: 'payable',
                  inputs: [
                    {
                      internalType: 'uint256',
                      name: 'quantity',
                      type: 'uint256',
                    },
                  ],
                  outputs: [],
                },
              ],
              address: '0xEcd0D12E21805803f70de03B72B1C162dB0898d9',
              functionName: 'mint',
              args: [1],
              value: parseEther('0'),
            },
            {
              onSuccess: () => {
                message.success('Mint Success');
              },
              onError: (err) => {
                message.error(err.message);
              },
            },
          );
        }}
      >
        mint
      </Button>
    </div>
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