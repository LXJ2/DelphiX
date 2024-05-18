'use client'

import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Hello DelphiX!😀</h1>
      <br/>
      <Link href={"/demo-page/address-format"}>AntDWeb3 组件导入测试</Link>
      <br/>
      <Link href={"/demo-page/antd-button"}>AntD UI导入测试</Link>
      <br/>
      <Link href={"/demo-page/nft-card"}>NFT展示组件</Link>
      <br/>
      <Link href={"/demo-page/connect-wallet"}>基础钱包组件</Link>
      <br/>
      <Link href={"/demo-page/connect-wallet-single"}>eip6963钱包组件</Link>
      <br/>
      <Link href={"/demo-page/connect-wallet-multiple"}>多链钱包组件</Link>
      <br/>
      <Link href={"/demo-page/read-contract"}>读合约Demo</Link>
      <br/>
      <Link href={"/demo-page/write-contract"}>写合约Demo</Link>
      <br/>
    </main>
  );
}
