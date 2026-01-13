import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { Input } from 'antd'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM_KEY } from '../constants'

const { Search } = Input

const ListSearch: FC = () => {
  const [value, setValue] = useState('')
  const [searchParams] = useSearchParams()
  const { pathname } = useLocation()
  const nav = useNavigate()

  useEffect(() => {
    const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
    setValue(curVal)
  }, [searchParams])

  //   输入改变时触发
  function handlerChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
  }

  //  点击搜索时触发
  function handlerSearch(value: string) {
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
    })
  }

  return (
    <Search
      value={value}
      size="large"
      allowClear
      placeholder="请输入关键词"
      style={{ width: '200px' }}
      onChange={handlerChange}
      onSearch={handlerSearch}
    />
  )
}

export default ListSearch
