import React, { FC, useEffect, useState } from 'react'
import { Space, Typography } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import styles from './Logo.module.scss'
import { Link } from 'react-router-dom'
import { useGetUserInfo } from '@/hooks/useGetUserInfo'

const { Title } = Typography

const Logo: FC = () => {
  const [pathname, setPathname] = useState('/')
  const { username } = useGetUserInfo()

  useEffect(() => {
    setPathname('/manage/list')
  }, [username])

  return (
    <div className={styles.container}>
      <Link to={pathname}>
        <Space>
          <Title>
            <FormOutlined></FormOutlined>
          </Title>
          <Title>小慕问卷</Title>
        </Space>
      </Link>
    </div>
  )
}

export default Logo
