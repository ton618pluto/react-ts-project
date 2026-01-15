import React, { FC } from 'react'
import { useLoadQuestionData } from '../../../hooks/useLoadQuestionData'

const Stat: FC = () => {
  const { loading, data } = useLoadQuestionData()
  return (
    <>
      {/* <div>Edit {id}</div> */}
      {loading ? <p>加载中...</p> : <p>{JSON.stringify(data)}</p>}
    </>
  )
}

export default Stat
