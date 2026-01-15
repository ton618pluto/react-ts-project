import React, { FC } from 'react'
import { Typography, Space, Form, Input, Button, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import styles from './Register.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { registerService } from '../services/user'

const { Title } = Typography

const Register: FC = () => {
  const nav = useNavigate()
  function onFinish(value: any) {
    run(value)
  }

  // 注册功能
  const { run } = useRequest(
    async values => {
      const { username, nickname, password } = values
      await registerService(username, password, nickname)
    },
    {
      manual: true,
      onSuccess() {
        message.success('注册成功')
        nav('/login')
      },
    }
  )

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserOutlined></UserOutlined>
          </Title>
          <Title level={2}>注册新用户</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ width: '400px' }}
          onFinish={onFinish}
        >
          <Form.Item
            label="用户名"
            name="username"
            validateTrigger="onBlur"
            rules={[
              { required: true, message: '请输入用户名' },
              { type: 'string', min: 3, max: 10, message: '用户名长度在3到10位之间' },
              { pattern: /^\w+$/, message: '用户名只能由字母、数字或下划线组成' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            validateTrigger="onBlur"
            rules={[
              { required: true, message: '请输入密码' },
              { type: 'string', min: 6, max: 15, message: '密码长度在6到15位之间' },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="confirm"
            validateTrigger="onBlur"
            dependencies={['password']} // 依赖于password，password变化会触发这个验证
            rules={[
              { required: true, message: '请输入密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  } else {
                    return Promise.reject('两次密码不一致')
                  }
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item label="昵称" name="nickname">
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 16, offset: 6 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
              <Link to={'/login'}>已有账号，直接登录</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Register
