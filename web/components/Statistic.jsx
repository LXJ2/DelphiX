import React from 'react'
import {Button, Card, Col, Row, Statistic} from 'antd'
import Countdown from "@/components/Countdown"

const valueStyle = {
  display: "none"
}




const CustomStatistic = ({competitionStartTime, competitionEndTime, betsEndsTime, poolValue, addressCount}) => (
  <>
    <Row justify={"space-around"} align={"middle"} style={{textAlign: 'center'}}>
      <Col span={5}>
        <div style={{background: "#d5e5f6", height: "150px", borderRadius: '10px', borderWidth: '2px', borderStyle: 'solid', borderColor: '#0e76fd'}}>
          <Statistic title="Competition Ends" valueStyle={valueStyle}/>
          <Countdown startTime={competitionStartTime} endTime={competitionEndTime}/>
        </div>
      </Col>
      <Col span={5}>
        <div style={{background: "#d5e5f6", height: "150px", borderRadius: '10px', borderWidth: '2px', borderStyle: 'solid', borderColor: '#0e76fd'}}>
          <Statistic title="Place Bets Ends" valueStyle={valueStyle}/>
          <Countdown startTime={competitionStartTime} endTime={betsEndsTime}/>
        </div>
      </Col>
      <Col span={5}>
        <div style={{background: "#d5e5f6", display: "flex", alignItems: "center", justifyContent: "center", height: "150px", borderRadius: '10px', borderWidth: '2px', borderStyle: 'solid', borderColor: '#0e76fd'}}>
          <Statistic title="Pool (USD)" value={poolValue} precision={2}/>
        </div>
      </Col>
      <Col span={5}>
        <div style={{background: "#d5e5f6", display: "flex", alignItems: "center", justifyContent: "center", height: "150px", borderRadius: '10px', borderWidth: '2px', borderStyle: 'solid', borderColor: '#0e76fd'}}>
          <Statistic title="Betting address Count" value={addressCount}/>
        </div>
      </Col>
    </Row>
  </>
)
export default CustomStatistic
