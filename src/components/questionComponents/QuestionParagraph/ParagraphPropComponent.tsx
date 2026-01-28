import React, { FC, useEffect } from 'react'
import { QuestionPragraphPropsType } from '@/types/questionTypes'
import { Form, Input, Checkbox } from 'antd'

const { TextArea } = Input

const TitlePropComponent: FC<QuestionPragraphPropsType> = (props: QuestionPragraphPropsType) => {
  const { text, isCenter, isLocked } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      text,
      isCenter,
      isLocked,
    })
  }, [text, isCenter, isLocked])

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
      initialValues={{ text, isCenter, isLocked }}
      onValuesChange={handleValueChange}
      disabled={isLocked}
    >
      <Form.Item name="text" label="段落内容" rules={[{ required: true, message: '请输入内容' }]}>
        <TextArea />
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default TitlePropComponent
