import React, { FC, useEffect, useState } from 'react'
import { Pagination } from 'antd'
import { LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE, LIST_PAGE_SIZE_PARAM_KEY } from '../constants'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

type PropsType = {
  total: number
}

const ListPage: FC<PropsType> = (props: PropsType) => {
  const { total } = props
  const [searchParams] = useSearchParams()
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE)
  //   从url参数中获取page和pageSize，并且同步给状态变量
  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
    const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE
    setCurrent(page)
    setPageSize(pageSize)
  }, [searchParams])

  //   当page或pageSize改变时，改变url参数
  const { pathname } = useLocation()
  const nav = useNavigate()

  function handlerPageChange(page: number, pageSize: number) {
    // nav(`${pathname}?page=${page}&pageSize=${pageSize}`)
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString())
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString())
    nav({
      pathname,
      search: searchParams.toString(),
    })
  }

  return (
    <Pagination
      total={total}
      current={current}
      pageSize={pageSize}
      align="end"
      onChange={handlerPageChange}
    ></Pagination>
  )
}

export default ListPage
