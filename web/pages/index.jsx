/*
 * @Author: lxj 1851816672@qq.com
 * @Date: 2024-05-18 03:30:59
 * @LastEditors: lxj 1851816672@qq.com
 * @LastEditTime: 2024-05-18 19:00:39
 * @FilePath: /DelphiX/web/pages/index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import { Layout, Menu, Card, Row, Col, Typography, Button, InputNumber, Modal } from 'antd'
import { useEffect, useState } from 'react'
// import logo from "@/public/logo.png"
import banner from 'public/banner.png'
import Image from "next/image"
import {stakeWeb,claimWeb,settleWinnerPriceWeb} from 'hooks/useContract.js'


const { Header, Content } = Layout
const { Title, Paragraph, Text } = Typography

const ETHBeijing = () => {
  const [currentTab, setCurrentTab] = useState(1)
  const [currentCompetitionTab, setCurrentCompetitionTab] = useState(1)

  const [competitionEndTime, setCompetitionEndTime] = useState('48:32:20')
  const [betsEndsTime, setBetsEndsTime] = useState('24:15:13')
  const [poolData, setPoolData] = useState(230)
  const [adressAmount, setAdressAmount] = useState(321)
  const [OpenModel, setOpenModel] = useState(false)
  const [winAmount, setWinAmount] = useState(0)
  const [track, setTrack] = useState("")


  const tabs = [{ index: 1, name: 'ETH Beijing' }, { index: 2, name: 'Upcoming Games' }]
  const competitionTabs = [{ index: 1, name: 'Public Goods' }, { index: 2, name: 'Innovative Laver2 Dapp' }, { index: 3, name: 'Open Research' }, { index: 4, name: 'Scroll' }]

  const [teams, setTeams] = useState([
    {
      id: 1, poolAmount: 0, inputValue: 0, projectName: 'DelphiX', intro: `DelphiX is a web3 forecast market for developers competition focusing on hackathon as well as coder events.
    It provides on chain staking to win the betting pool for layer 1 & layer 2 completition. Now it supports ETH Beijing as season 1.` },
    {
      id: 2, poolAmount: 321, inputValue: 0, projectName: 'Forest3', intro: `Forest3 is a blockchain-based decentralized application that allows users to set personal goals, 
    deposit self-discipline funds, and distribute bonuses according to the voting results and completion status.` }
  ]);

  // Handler to update item value
  const onInputChange = (id, newValue) => {
    setTeams(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, inputValue: newValue } : item
      )
    );
  };

  const tabClick = (data) => {
    setCurrentTab(data.index)
  }
  const competitionTabsClick = (data) => {
    setCurrentCompetitionTab(data.index)
    setCurrentCompetitionTabName(data.name)
    if (data.index == 2) {
      setTeams(
        [
          {
            id: 1, poolAmount: 0, inputValue: 0, projectName: 'Yap Islands', intro: `Yap Islands is a secondary encapsulation protocol designed for the segmented application scenarios of stablecoins. `
          },

        ]
      );
    }
    if (data.index == 3) {
      setTeams(
        [
          {
            id: 1, poolAmount: 0, inputValue: 0, projectName: 'DelphiX', intro: `DelphiX is a web3 forecast market for developers competition focusing on hackathon as well as coder events.
          It provides on chain staking to win the betting pool for layer 1 & layer 2 completition. Now it supports ETH Beijing as season 1.` },
          {
            id: 2, poolAmount: 321, inputValue: 0, projectName: 'Forest3', intro: `Forest3 is a blockchain-based decentralized application that allows users to set personal goals, 
          deposit self-discipline funds, and distribute bonuses according to the voting results and completion status.` }
        ]
      );
    }
    if (data.index == 4) {
      setTeams(
        [
          {
            id: 1, poolAmount: 0, inputValue: 0, projectName: 'DelphiX', intro: `DelphiX is a web3 forecast market for developers competition focusing on hackathon as well as coder events.
          It provides on chain staking to win the betting pool for layer 1 & layer 2 completition. Now it supports ETH Beijing as season 1.` },

        ]
      );
    }

  }

  const onDecrease = (id, value) => {
    if (value == 0) return
    setTeams(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, inputValue: value - 1 } : item
      )
    );

  }

  const onIncrease = (id, value) => {
    setTeams(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, inputValue: value + 1 } : item
      )
    );
  }

  const bet = async (track,team,amount) => {
    console.log("tracks:",track);
    await stakeWeb(track,team,amount)
  }

  const checkbet = async(track) => {
    const price = settleWinnerPriceWeb(track,user)
    await setWinAmount(price)
    setOpenModel(true)
  }

  const handleCancel = async() => {
    setOpenModel(false)
  }

  const claim = async(track)  => { 
    await claimWeb(track)
  }
  return (
    <Layout style={{ backgroundColor: '#fff', borderRadius: '10px' }}>
      <Header>
        <Menu style={{ fontSize: '20px' }} theme="light" mode="horizontal" defaultSelectedKeys={[1]}>
          {tabs.map(item => {
            return <Menu.Item key={item.index} onClick={() => {
              tabClick(item)
            }}>{item.name}</Menu.Item>
          })}
        </Menu>
      </Header>
      <Content style={{ padding: '20px', backgroundColor: '#fff' }}>
        {currentTab == 1 ? <div style={{ background: '#f0f2f5', padding: '20px 0', borderRadius: '10px' }}>

          <div style={{ textAlign: 'center', background: '#e9e9e9', marginBottom: '20px' }}>
            <Image src={banner} alt="image" />
          </div>
          <div style={{ padding: '0 50px' }}>
            <section style={{ marginBottom: '40px' }}>
              <Title level={2}>Intro & Rules</Title>
              <Paragraph>
                ETH Beijing is supported by ETH Foundation and Scroll to help Web3 coders in Ethereum to bring more ideas and grow...
              </Paragraph>
              <Paragraph>
                DelphiX is to help users who focus on ETH Beijing with interest to participate betting "Who Is Winner". ETH Beijing Winner can get the grant of the 20% pool and bets users can get 80% if they bet the right result.
              </Paragraph>
            </section>
            <div style={{ display: 'flex' }}>
              <section style={{ marginBottom: '40px' }}>
                <Title level={2}>Statistics</Title>
                <Paragraph>Competition Ends in {competitionEndTime}</Paragraph>
                <Paragraph>Place Bets Ends in {betsEndsTime}</Paragraph>
                <Paragraph>
                  Pool <Text strong>{poolData} USDT</Text>
                </Paragraph>
                <Paragraph>
                  Betting <Text strong>{adressAmount} addresses</Text>
                </Paragraph>
              </section>
              <section style={{ marginBottom: '40px', marginLeft: '400px' }}>
                <Title level={2}>Winner</Title>
                <Paragraph></Paragraph>
                <div onClick={checkbet}>Check My Bet</div>
              </section>
            </div>
            <section>
              <Title level={2}>Teams</Title>
              <Menu style={{ fontSize: '16px', background: '#f0f2f5', marginBottom: '20px' }} theme="light" mode="horizontal" defaultSelectedKeys={[1]}>
                {competitionTabs.map(item => {
                  return <Menu.Item key={item.index} onClick={() => {
                    competitionTabsClick(item)
                  }}>{item.name}</Menu.Item>
                })}
              </Menu>
              <Row gutter={16}>
                {teams.map(item => {
                  return <Col span={8} key={item.id}>
                    <Card title={item.projectName} bordered={false}>
                      <Paragraph>Intro</Paragraph>
                      <Paragraph>
                        {item.intro}
                      </Paragraph>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Paragraph> Pool</Paragraph>
                        <Paragraph> {item.poolAmount} USDT</Paragraph>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', marginRight: '20px' }}>
                          <Button onClick={() => onDecrease(item.id, item.inputValue)}>-</Button>
                          <InputNumber
                            min={0}
                            value={item.inputValue}
                            addonAfter="USDT"
                            onChange={(newValue) => onInputChange(item.id, newValue)}
                          />
                          <Button onClick={() => onIncrease(item.id, item.inputValue)}>+</Button>
                        </div>
                        
                        <Button onClick={() => bet(competitionTabs[item.id-1].name,item.projectName,item.inputValue)}>Bets</Button>
                      </div>
                    </Card>
                  </Col>
                })}

              </Row>
            </section>
          </div>
        </div> : 'Coming soon!'}
      </Content>
      <Modal
        open={OpenModel}
        title=""
        onCancel={handleCancel}
        footer={[

        ]}
      >
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Title level={2}>My Betting Result</Title>
          <Paragraph>Unfortunately, you have not won the forecast</Paragraph>
          <Paragraph>
            <Text strong>Claim to get your reward {winAmount} USDT</Text>
          </Paragraph>
          <div onClick={() => claim(track)} style={{ width: '100%', borderRadius: '25px', height: '32px', backgroundColor: 'yellow', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px', cursor: 'pointer' }}>Claim</div>
          <div onClick={handleCancel} style={{ width: '100%', borderRadius: '25px', height: '32px', backgroundColor: '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>Close</div>
        </div>
      </Modal>
    </Layout>

  )
}

export default ETHBeijing
