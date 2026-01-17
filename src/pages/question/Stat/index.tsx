import React, { FC } from 'react'
import { useLoadQuestionData } from '../../../hooks/useLoadQuestionData'

const Stat: FC = () => {
  const { loading } = useLoadQuestionData()
  return (
    <>
      {/* <div>Edit {id}</div> */}
      {loading ? <p>加载中...</p> : <p>{'数据'}</p>}
    </>
  )
}

export default Stat
