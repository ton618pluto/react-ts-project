import React, { FC } from 'react'
import { QuestionInfoPropsType } from '@/types/questionTypes'
import QuestionInfoDefault from './default'
import { Typography } from 'antd'

const { Title, Paragraph } = Typography

const QuestionInfo: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
  const { text, desc = '' } = { ...QuestionInfoDefault, ...props }
  const descTextList = desc.split('\n')

  return (
    <div style={{ textAlign: 'center' }}>
      <Title style={{ fontSize: '24px' }}>{text}</Title>
      <Paragraph>
        {descTextList.map((item, idx) => (
          <span key={idx}>
            {idx > 0 && <br />}
            {item}
          </span>
        ))}
      </Paragraph>
    </div>
  )
}

export default QuestionInfo
