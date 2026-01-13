import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

const QuestionLayout: FC = () => {
  return (
    <>
      <p>QuesitonLayout</p>
      <Outlet></Outlet>
    </>
  )
}

export default QuestionLayout
