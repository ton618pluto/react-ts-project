import React, { FC, useState } from 'react'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import styles from './common.module.scss'
import { useSearchParams } from 'react-router-dom'
import { useTitle } from 'ahooks'
import { Typography } from 'antd'
const { Title } = Typography

const rawQuestionList = [
  {
    _id: 'q1',
    title: '问卷1',
    isPublished: false,
    isStar: true,
    answerCount: 5,
    createdAt: '2月10日 13:23',
  },
  {
    _id: 'q2',
    title: '问卷2',
    isPublished: true,
    isStar: false,
    answerCount: 5,
    createdAt: '2月11日 14:23',
  },
  {
    _id: 'q3',
    title: '问卷3',
    isPublished: false,
    isStar: false,
    answerCount: 5,
    createdAt: '2月12日 13:23',
  },
  {
    _id: 'q4',
    title: '问卷4',
    isPublished: true,
    isStar: false,
    answerCount: 5,
    createdAt: '2月13日 13:23',
  },
]

const List: FC = () => {
  const [questionList] = useState(rawQuestionList)
  useTitle('小慕问卷 - 我的问卷')
  const [searchParams] = useSearchParams()
  console.log('keyword', searchParams.get('keyword'))

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {questionList.map(item => {
          const { _id } = item
          return <QuestionCard key={_id} {...item}></QuestionCard>
        })}
      </div>
      <div className={styles.footer}>loadMore ... 上划加载更多...</div>
    </>
  )
}

export default List
