import { useGetPageInfo } from '@/hooks/useGetPageInfo'
import React, { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { useAppDispatch } from '@/store/types'
import { resetPageInfo } from '@/store/modules/pageInfoReducer'
const { TextArea } = Input

const PageSetting: FC = () => {
  const pageInfo = useGetPageInfo()
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()

  useEffect(() => {
    form.setFieldsValue(pageInfo)
  }, [pageInfo])

  function handleValuesChange() {
    dispatch(resetPageInfo(form.getFieldsValue()))
  }

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={pageInfo}
      onValuesChange={handleValuesChange}
    >
      <Form.Item
        name={'title'}
        label="问卷标题"
        rules={[{ required: true, message: '请输入问卷标题' }]}
      >
        <Input placeholder="请输入标题"></Input>
      </Form.Item>
      <Form.Item name={'desc'} label="问卷描述">
        <Input placeholder="请输入问卷描述"></Input>
      </Form.Item>
      <Form.Item name={'css'} label="问卷样式">
        <TextArea placeholder="请输入css"></TextArea>
      </Form.Item>
      <Form.Item name={'js'} label="问卷脚本">
        <TextArea placeholder="请输入js"></TextArea>
      </Form.Item>
    </Form>
  )
}

export default PageSetting
