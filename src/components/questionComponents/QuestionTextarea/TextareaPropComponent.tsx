import React, { FC, useEffect } from 'react'
import { QuestionTextareaPropsType } from '@/types/questionTypes'
import { Form, Input } from 'antd'

const { TextArea } = Input

const TextareaPropComponent: FC<QuestionTextareaPropsType> = (props: QuestionTextareaPropsType) => {
  const { text, placeholder, isLocked } = props

  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ text, placeholder })
  }, [text, placeholder])

  // 表单值修改时触发
  function handleValueChange() {
    const { onChange } = props
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ text, placeholder }}
      form={form}
      onValuesChange={handleValueChange}
      disabled={isLocked}
    >
      <Form.Item name="text" label="标题" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="placeholder" label="Placeholder">
        <TextArea />
      </Form.Item>
    </Form>
  )
}

export default TextareaPropComponent
