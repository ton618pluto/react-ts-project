import React, { FC } from 'react'
import { QuestionTextareaPropsType } from '@/types/questionTypes'
import { QuestionTextareaDefault } from './default'
import { Typography, Input } from 'antd'

const { Paragraph } = Typography
const { TextArea } = Input

const QuestionTextarea: FC<QuestionTextareaPropsType> = (props: QuestionTextareaPropsType) => {
  const { text, placeholder } = { ...QuestionTextareaDefault, ...props }
  return (
    <div>
      <Paragraph strong>{text}</Paragraph>
      <div>
        <TextArea placeholder={placeholder} />
      </div>
    </div>
  )
}

export default QuestionTextarea
