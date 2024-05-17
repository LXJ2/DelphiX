/*
 * @Author: lxj 1851816672@qq.com
 * @Date: 2024-05-18 03:30:59
 * @LastEditors: lxj 1851816672@qq.com
 * @LastEditTime: 2024-05-18 04:17:17
 * @FilePath: /DelphiX/web/pages/index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
import { Layout, Menu, Card, Row, Col, Typography, Button } from 'antd';

const { Header, Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const ETHBeijing = () => {
  return (
    <Layout>
      <Header>
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">ETH Beijing</Menu.Item>
          <Menu.Item key="2">Upcoming Games</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '50px', backgroundColor: '#fff' }}>
        <div style={{ background: '#f0f2f5', padding: '30px 0' }}>
          <div style={{ textAlign: 'center', padding: '50px 0', background: '#e9e9e9', marginBottom: '20px' }}>
            <Title>Banner</Title>
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
              <Paragraph>Competition Ends in 48:32:20</Paragraph>
              <Paragraph>Place Bets Ends in 24:15:13</Paragraph>
              <Paragraph>
                Pool <Text strong>300,123 USDT</Text>
              </Paragraph>
              <Paragraph>
                Betting <Text strong>321 addresses</Text>
              </Paragraph>
            </section>
            <section>
              <Title level={2}>Teams</Title>
              <Row gutter={16}>
                <Col span={6}>
                  <Card title="Project Name" bordered={false}>
                    <Paragraph>Intro</Paragraph>
                    <Paragraph>Our idea is a market place for NFT holders...</Paragraph>
                    <Paragraph>HOT Bets: 310</Paragraph>
                    <Button type="primary">Bets</Button>
                  </Card>
                </Col>
                <Col span={6}>
                  <Card title="Project Name" bordered={false}>
                    <Paragraph>Intro</Paragraph>
                    <Paragraph>Our idea is a market place for NFT holders...</Paragraph>
                    <Paragraph>HOT Bets: 231</Paragraph>
                    <Button type="primary">Bets</Button>
                  </Card>
                </Col>
                <Col span={6}>
                  <Card title="Project Name" bordered={false}>
                    <Paragraph>Intro</Paragraph>
                    <Paragraph>Our idea is a market place for NFT holders...</Paragraph>
                    <Paragraph>HOT Bets: 123</Paragraph>
                    <Button type="primary">Bets</Button>
                  </Card>
                </Col>
                <Col span={6}>
                  <Card title="Project Name" bordered={false}>
                    <Paragraph>Intro</Paragraph>
                    <Paragraph>Our idea is a market place for NFT holders...</Paragraph>
                    <Paragraph>HOT Bets: 12</Paragraph>
                    <Button type="primary">Bets</Button>
                  </Card>
                </Col>

              </Row>
            </section>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default ETHBeijing;
