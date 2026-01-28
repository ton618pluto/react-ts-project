import React, { FC, useEffect } from 'react'
import { QuestionInfoPropsType } from '@/types/questionTypes'
import { Form, Input } from 'antd'

const { TextArea } = Input

const InfoPropComponent: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
  const { text, desc, isLocked, onChange } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ text, desc })
  }, [text, desc])

  function handleValuesChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ text, desc }}
      onValuesChange={handleValuesChange}
      disabled={isLocked}
      form={form}
    >
      <Form.Item label="标题" name="text" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="描述" name="desc">
        <TextArea />
      </Form.Item>
    </Form>
  )
}

export default InfoPropComponent
