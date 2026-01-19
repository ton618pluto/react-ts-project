import React, { FC, useEffect } from 'react'
import { QuestionTitlePropsType } from '@/types/questionTypes'
import { Form, Input, Select, Checkbox } from 'antd'

const TitlePropComponent: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
  const { title, level, isCenter } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      title,
      level,
      isCenter,
    })
  }, [title, level, isCenter])

  // 表单值修改时触发
  function handleValueChange() {
    const { onChange } = props
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, level, isCenter }}
      onValuesChange={handleValueChange}
    >
      <Form.Item name="title" label="标题内容">
        <Input />
      </Form.Item>
      <Form.Item name="level" label="层级">
        <Select
          options={[
            {
              value: 1,
              text: 1,
            },
            {
              value: 2,
              text: 2,
            },
            {
              value: 3,
              text: 3,
            },
          ]}
        ></Select>
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default TitlePropComponent
