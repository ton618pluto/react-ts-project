import React, { FC, useState, useEffect, useRef, useMemo } from 'react'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import styles from './common.module.scss'
// import { useSearchParams } from 'react-router-dom'
import { useDebounceFn, useRequest, useTitle } from 'ahooks'
import { Typography, Spin, Empty } from 'antd'
import { getQuestionListService, QuestionType } from '../../services/question'
import { useSearchParams } from 'react-router-dom'
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '../../constants'
const { Title } = Typography

const List: FC = () => {
  useTitle('小慕问卷 - 我的问卷')
  const [started, setStarted] = useState(false)
  const [searchParams] = useSearchParams()
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [list, setList] = useState<QuestionType[]>([])
  const hasMoreData = total > list.length
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''

  // keyword变化时重置信息
  useEffect(() => {
    setStarted(false)
    setPage(1)
    setTotal(0)
    setList([])
  }, [keyword])

  // 真正加载
  const { run: loadData, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword,
      })

      // setStarted(false)

      return data
    },
    {
      manual: true, // 异步请求函数设置为手动调用
      onSuccess(result) {
        const { list: newList = [], total = 0 } = result
        // 拼接旧数据和新数据
        setList([...list, ...newList])
        setTotal(total)
        // 页号+1
        setPage(page + 1)
      },
    }
  )

  // 尝试加载
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      // console.log(123)

      const element = loadMoreRef.current // 底部加载更多的文字DOM元素
      if (element === null) return
      const domRect = element.getBoundingClientRect()
      const bottom = domRect.bottom // 获取元素底部距离可视窗口顶部的距离
      if (bottom < document.body.clientHeight) {
        // document.body.clientHeight为可视窗口的高度

        loadData()
        setStarted(true)
      }
    },
    { wait: 600 }
  )

  // 当页面加载或者url参数（keyword）发生变化时执行
  useEffect(() => {
    tryLoadMore()
  }, [searchParams])

  useEffect(() => {
    if (hasMoreData) {
      window.addEventListener('scroll', tryLoadMore)
    }

    return () => {
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [searchParams, hasMoreData])

  // 加载更多的DOM
  const LoadMoreElement = useMemo(() => {
    if (!started || loading) return <Spin></Spin>
    if (total === 0) return <Empty>暂无数据</Empty>
    if (!hasMoreData) return <span>没有更多数据了</span>
    return <span>开始加载下一页</span>
  }, [started, loading, total, hasMoreData])

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
        {/* <div style={{ height: '2000px' }}></div> */}
        {list.length > 0 &&
          list.map(item => {
            const { _id } = item
            return <QuestionCard key={_id} {...item}></QuestionCard>
          })}
      </div>
      <div className={styles.footer}>
        <div ref={loadMoreRef}>{LoadMoreElement}</div>
      </div>
    </>
  )
}

export default List
