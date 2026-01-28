import React, { FC } from 'react'
import { QuestionPragraphPropsType } from '@/types/questionTypes'
import QuestionParagraphDefault from './default'
import { Typography } from 'antd'

const { Paragraph } = Typography

const QuestionParagraph: FC<QuestionPragraphPropsType> = (props: QuestionPragraphPropsType) => {
  const { text, isCenter } = { ...QuestionParagraphDefault, ...props }
  // const t = text.replaceAll('\n', '<br>')
  const textList = text.split('\n')

  return (
    <Paragraph style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: 0 }}>
      {/* 尽量不要使用dangerouslySetInnerHTML，不安全 */}
      {/* <span dangerouslySetInnerHTML={{ __html: t }}></span> */}
      {textList.map((t, idx) => (
        <span key={idx}>
          {idx > 0 && <br />}
          {t}
        </span>
      ))}
    </Paragraph>
  )
}

export default QuestionParagraph
