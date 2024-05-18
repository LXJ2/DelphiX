/*
 * @Author: lxj 1851816672@qq.com
 * @Date: 2024-05-18 03:30:59
 * @LastEditors: lxj 1851816672@qq.com
 * @LastEditTime: 2024-05-18 16:11:26
 * @FilePath: /DelphiX/web/pages/index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import { Layout, Menu, Card, Row, Col, Typography, Button, InputNumber } from 'antd'
import { useEffect, useState } from 'react'
// import logo from "@/public/logo.png"
import banner from 'public/banner.png'
import Image from "next/image"

const { Header, Content } = Layout
const { Title, Paragraph, Text } = Typography

const ETHBeijing = () => {
  const [currentTab, setCurrentTab] = useState(1)
  const [competitionEndTime, setCompetitionEndTime] = useState('48:32:20')
  const [betsEndsTime, setBetsEndsTime] = useState('24:15:13')
  const [poolData, setPoolData] = useState(2301111)
  const [adressAmount, setAdressAmount] = useState(321)
  const [poolAmount, setPoolAmount] = useState(321)


  const tabs = [{ index: 1, name: 'ETH Beijing' }, { index: 2, name: 'Upcoming Games' }]
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

  const bet = () => {

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
            <section>
              <Title level={2}>Teams</Title>
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
                        <div style={{ display: 'flex' }}>
                          <Button onClick={() => onDecrease(item.id, item.inputValue)}>-</Button>
                          <InputNumber
                            min={0}
                            value={item.inputValue}
                            addonAfter="USDT"
                            onChange={(newValue) => onInputChange(item.id, newValue)}
                          />
                          <Button onClick={() => onIncrease(item.id, item.inputValue)}>+</Button>
                        </div>
                        <Button>Bets</Button>
                      </div>
                    </Card>
                  </Col>
                })}

              </Row>
            </section>
          </div>
        </div> : 'Coming soon!'}

      </Content>
    </Layout>
  )
}

export default ETHBeijing
