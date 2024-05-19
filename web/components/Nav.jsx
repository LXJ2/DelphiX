/*
 * @Author: lxj 1851816672@qq.com
 * @Date: 2023-12-24 05:11:34
 * @LastEditors: lxj 1851816672@qq.com
 * @LastEditTime: 2024-05-17 17:44:25
 * @FilePath: /marketPlace/components/Nav.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, {useEffect, useState} from 'react'
import styles from 'styles/Nav.module.css'
import logo from 'public/logo.jpg'
// import twitter from '@/assets/image/svg/twitter.svg'
// import gitbook from '@/assets/image/svg/gitbook.svg'
import Image from 'next/image'
import {ConnectButton} from '@rainbow-me/rainbowkit'
import {useAccount, useNetwork} from 'wagmi'
import {useRouter} from 'next/router'
import Link from 'next/link'
import {Button, Col, Input, Modal, Row} from "antd"
import faucet from 'public/faucet.jpg'
import DelphiX from 'public/DelphiX.png'

const Nav = () => {
  const {address} = useAccount()
  const {chain} = useNetwork()
  const router = useRouter()
  const currentPath = router.pathname
  // 根据当前路径进行判断或其他逻辑
  const isHome = currentPath === '/'

  const [OpenModelFaucet, setOpenModelFaucet] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [tokenValue, setTokenValue] = useState(100)

  useEffect(() => {
    if (chain?.network == "sepolia") {
      // 使用 router.push 进行跳转
      router.push('/')
    }
  }, [chain])


  const showFaucetModel = () => {
    setOpenModelFaucet(true)
  }

  const closeFaucetModel = () => {
    setOpenModelFaucet(false)
  }
  const submitFaucet = () => {
    console.log({tokenValue, walletAddress})
  }


  return (
    <div className={styles.container} style={{paddingLeft: "20px", paddingRight: "50px"}}>


      <Modal title="mock USDT Faucet" open={OpenModelFaucet} onOk={submitFaucet} onCancel={closeFaucetModel} footer={null}>
        <Row justify={"space-around"} align={"middle"} style={{textAlign: 'center'}}>
          <Image src={faucet} alt="image" style={{marginBottom: "20px"}}/>
          <Input value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} size="large" placeholder="your address" style={{marginBottom: "20px", borderColor: "#0e76fd"}}/>
          <Button onClick={submitFaucet} className={`${styles.connectWalletBtn}`}>Faucet me 100 USDT</Button>
        </Row>

      </Modal>

      <div className={styles.tittle}>
        <Link href="/">
          <Row align={"middle"}>
            <Col span={5}>
              <Image src={logo} alt="image" width={150} height={150}/>
            </Col>
            <Col span={5}>
              <Image src={DelphiX} alt="image" width={120} height={120}/>
            </Col>
          </Row>

        </Link>
      </div>

      <div className={styles.connectBtn}>
        <ConnectButton.Custom>
          {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
            // Note: If your app doesn't use authentication, you
            // can remove all 'authenticationStatus' checks
            const ready = mounted && authenticationStatus !== 'loading'
            const connected =
              ready &&
              account &&
              chain &&
              (!authenticationStatus ||
                authenticationStatus === 'authenticated')
            return (
              <div
                {...(!ready && {
                  'aria-hidden': true,
                  'style': {
                    opacity: 0,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <Row>
                        <Col span={10} offset={1}>
                          <Button className={`${styles.connectWalletBtn}`} onClick={showFaucetModel}>Faucet</Button>
                        </Col>
                        <Col span={10} offset={1}>
                          <Button className={`${styles.connectWalletBtn}`} onClick={openConnectModal}>Connect Wallet</Button>
                        </Col>
                      </Row>
                    )
                  }
                  if (chain.unsupported) {
                    return (
                      <button onClick={openChainModal} type="button" className={`${styles.connectWalletBtn} + ${styles.walletAdressBtn}`}>
                        Wrong network
                      </button>
                    )
                  }
                  return (
                    <div style={{display: 'flex', gap: 12}}>
                      <button
                        onClick={openChainModal}
                        className={`${styles.connectWalletBtn} + ${styles.walletAdressBtn}`}
                        type="button"
                      >
                        {chain.hasIcon && (
                          <div
                            style={{
                              background: chain.iconBackground,
                              width: 16,
                              height: 16,
                              borderRadius: 999,
                              marginRight: 4,
                              overflow: 'hidden',
                            }}
                          >
                            {chain.iconUrl && (
                              <img
                                alt={chain.name ?? 'Chain icon'}
                                src={chain.iconUrl}
                                style={{width: 16, height: 16}}
                              />
                            )}
                          </div>
                        )}
                        {chain.name}
                      </button>
                      <button onClick={openAccountModal} type="button" className={`${styles.connectWalletBtn} + ${styles.walletAdressBtn}`}>
                        {account.displayName}
                        {account.displayBalance
                          ? ` (${account.displayBalance})`
                          : ''}
                      </button>
                    </div>
                  )
                })()}
              </div>
            )
          }}
        </ConnectButton.Custom>
      </div>
    </div>
  )
}

export default Nav