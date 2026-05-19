import React, { FC } from 'react'

import { Typography, Radio, Space } from 'antd'

import { QuestionRadioPropsType } from '@/types/questionTypes'

import { QuestionRadioDefaultProps } from './default'

const { Paragraph } = Typography

const QutstionRadio: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const {
    title,

    isVertical,

    value,

    options = [],

    onChange,
  } = { ...QuestionRadioDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>

      <Radio.Group
        value={value}
        onChange={e => {
          if (onChange) {
            onChange({ ...props, value: e.target.value })
          }
        }}
      >
        <Space orientation={isVertical ? 'vertical' : 'horizontal'}>
          {options.map(opt => {
            const { value, text } = opt

            return (
              <Radio value={value} key={value}>
                {text}
              </Radio>
            )
          })}
        </Space>
      </Radio.Group>
    </div>
  )
}

export default QutstionRadio
