import React, { FC } from 'react'
import { QuestionInputPropsType } from '@/types/questionTypes'
import { QuestionInputDefault } from './default'
import { Typography, Input } from 'antd'

const { Paragraph } = Typography

const QuestionInput: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
  const { text, placeholder } = { ...QuestionInputDefault, ...props }
  return (
    <div>
      <Paragraph strong>{text}</Paragraph>
      <div>
        <Input placeholder={placeholder} />
      </div>
    </div>
  )
}

export default QuestionInput
