import React, {useState, useEffect} from 'react'
import {Progress, Typography} from 'antd'

const {Text} = Typography

const CountdownCircleProgress = ({startTime, endTime}) => {
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime(startTime, endTime))

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime(calculateRemainingTime(startTime, endTime))
    }, 1000)

    return () => clearInterval(intervalId)
  }, [startTime, endTime])

  function calculateRemainingTime(startTime, endTime) {
    const start = new Date(startTime).getTime()
    const end = new Date(endTime).getTime()
    const now = new Date().getTime()
    return Math.max(end - Math.max(start, now), 0)

  }

  const totalTime = calculateRemainingTime(startTime, endTime) + (new Date(endTime).getTime() - new Date(startTime).getTime()) // 总时长
  const percent = parseFloat((((totalTime - remainingTime) / totalTime) * 100).toFixed(2))

  function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div>
      <Progress showInfo={false} type="circle" percent={Math.min(100, percent)}/>
      <Text
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 16,
          color: '#1e2f7c',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        {`${percent}%`}
      </Text>
      <Text
        style={{
          position: 'absolute',
          top: '65%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 16,
          color: '#1e2f7c',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        {`${formatTime(remainingTime)}`}
      </Text>

    </div>
  )
}

export default CountdownCircleProgress