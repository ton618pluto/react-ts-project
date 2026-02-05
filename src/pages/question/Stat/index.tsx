import React, { FC, useState } from 'react'
import { useLoadQuestionData } from '../../../hooks/useLoadQuestionData'
import { Button, Result, Spin } from 'antd'
import { useGetPageInfo } from '@/hooks/useGetPageInfo'
import { useNavigate } from 'react-router-dom'
import { useTitle } from 'ahooks'
import styles from './index.module.scss'
import StatHeader from './StatHeader'
import ComponentList from './ComponentList'
import PageStat from './PageStat'
import ChartStat from './ChartStat'

const Stat: FC = () => {
  const { loading } = useLoadQuestionData()
  const { isPublished, title } = useGetPageInfo()
  const navigate = useNavigate()

  // 状态提升
  const [selectedComponentId, setSelectedComponentId] = useState('')
  const [selectedComponentType, setSelectedComponentType] = useState('')

  useTitle(`问卷统计 - ${title}`)

  const LoadingElement = (
    <div
      style={{
        textAlign: 'center',
        marginTop: '60px',
        flex: 1,
      }}
    >
      <Spin />
    </div>
  )

  const getContentElement = () => {
    if (!isPublished) {
      return (
        <Result
          status="warning"
          title="抱歉，该问卷还未发布"
          extra={
            <Button type="primary" onClick={() => navigate(-1)}>
              返回
            </Button>
          }
        ></Result>
      )
    } else {
      return (
        <>
          <div className={styles.left}>
            <ComponentList
              selectedComponentId={selectedComponentId}
              setSelectedComponentId={setSelectedComponentId}
              setSelectedComponentType={setSelectedComponentType}
            ></ComponentList>
          </div>
          <div className={styles.main}>
            <PageStat
              selectedComponentId={selectedComponentId}
              setSelectedComponentId={setSelectedComponentId}
              setSelectedComponentType={setSelectedComponentType}
            />
          </div>
          <div className={styles.right}>
            <ChartStat
              selectedComponentId={selectedComponentId}
              selectedComponentType={selectedComponentType}
            ></ChartStat>
          </div>
        </>
      )
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <StatHeader></StatHeader>
      </div>

      <div className={styles['content-wrapper']}>
        {loading ? LoadingElement : <div className={styles['content']}>{getContentElement()}</div>}
      </div>
    </div>
  )
}

export default Stat
