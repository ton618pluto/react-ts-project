import React, { FC, useEffect } from 'react'
import { QuestionInputPropsType } from '@/types/questionTypes'
import { Form, Input } from 'antd'

const InputPropComponent: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
  const { title, placeholder } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, placeholder })
  }, [title, placeholder])

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
      initialValues={{ title, placeholder }}
      form={form}
      onValuesChange={handleValueChange}
    >
      <Form.Item name="title" label="标题" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="placeholder" label="Placeholder">
        <Input />
      </Form.Item>
    </Form>
  )
}

export default InputPropComponent
