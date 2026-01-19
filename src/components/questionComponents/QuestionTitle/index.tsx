import React, { FC } from 'react'
import { QuestionTitlePropsType } from '@/types/questionTypes'
import { QuestionTitleDefault } from './default'
import { Typography } from 'antd'

const { Title } = Typography

const QuestionTitle: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
  const { title, level, isCenter } = { ...QuestionTitleDefault, ...props }
  console.log(123)

  function getFontSize() {
    switch (level) {
      case 1:
        return '24px'
      case 2:
        return '20px'
      default:
        return '16px'
    }
  }

  return (
    <Title
      level={level}
      style={{ textAlign: isCenter ? 'center' : 'start', fontSize: getFontSize(), marginBottom: 0 }}
    >
      {title}
    </Title>
  )
}

export default QuestionTitle
