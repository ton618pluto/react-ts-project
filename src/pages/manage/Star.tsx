import React, { FC } from 'react'
import QuestionCard from '../../components/QuestionCard'
import styles from './common.module.scss'
import { useTitle } from 'ahooks'
import { Typography, Empty, Spin } from 'antd'
import ListSearch from '../../components/ListSearch'
import { useLoadQuestionListData } from '../../hooks/useLoadQuestionListData'
import ListPage from '../../components/ListPage'
const { Title } = Typography

const Star: FC = () => {
  useTitle('小慕问卷 - 星标问卷')
  const { data, loading } = useLoadQuestionListData({ isStar: true })
  const { list: questionList = [], total = 100 } = data || {}

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin></Spin>
          </div>
        )}
        {!loading && questionList.length === 0 && <Empty description="暂无数据..."></Empty>}
        {!loading &&
          questionList.length > 0 &&
          questionList.map(item => {
            const { _id } = item
            return <QuestionCard key={_id} {...item}></QuestionCard>
          })}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  )
}

export default Star
