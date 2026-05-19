import React, { FC, useEffect } from 'react'
import { Typography, Space, Form, Input, Button, Checkbox, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import styles from './Login.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { loginService } from '../services/user'
import { useRequest } from 'ahooks'
import { setToken } from '../utils/user-token'

const { Title } = Typography
const USERNAME_KEY = 'USERNAME'
const PASSWORD_KEY = 'PASSWORD'

function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username)
  localStorage.setItem(PASSWORD_KEY, password)
}

function forgetUser() {
  localStorage.removeItem(USERNAME_KEY)
  localStorage.removeItem(PASSWORD_KEY)
}

function getUserFormStorage() {
  return {
    username: localStorage.getItem(USERNAME_KEY) || '',
    password: localStorage.getItem(PASSWORD_KEY) || '',
  }
}

const Login: FC = () => {
  const nav = useNavigate()
  // 登录功能
  const { run } = useRequest(
    async values => {
      const { username, password } = values
      const data = await loginService(username, password)
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        message.success('登录成功')
        setToken(result.token)
        nav('/manage/list')
      },
    }
  )
  function onFinish(value: any) {
    const { username, password, remember } = value || {}
    run(value)
    if (remember) {
      rememberUser(username, password)
    } else {
      forgetUser()
    }
  }
  const [form] = Form.useForm()

  useEffect(() => {
    const { username, password } = getUserFormStorage()
    form.setFieldsValue({
      username,
      password,
    })
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.title}>
          <Space>
            <UserOutlined></UserOutlined>
            <Title level={2}>用户登录</Title>
          </Space>
        </div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ width: '320px' }}
          onFinish={onFinish}
          initialValues={{ remember: true }}
          form={form}
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
          <Form.Item wrapperCol={{ span: 16, offset: 6 }} name="remember" valuePropName="checked">
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 16, offset: 6 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to={'/register'}>注册新用户.</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
