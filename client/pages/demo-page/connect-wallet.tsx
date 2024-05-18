import {ConnectButton, Connector} from '@ant-design/web3';
import {MetaMask, WagmiWeb3ConfigProvider} from '@ant-design/web3-wagmi';
import {createConfig, http} from 'wagmi';
import {mainnet} from 'wagmi/chains';
import {injected} from 'wagmi/connectors';

const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
  connectors: [
    injected({
      target: 'metaMask',
    }),
  ],
});

export default function Web3() {
  return (
    <>
      <WagmiWeb3ConfigProvider config={config} wallets={[MetaMask()]}>
        <Connector>
          <ConnectButton/>
        </Connector>
      </WagmiWeb3ConfigProvider>
    </>
  );
}