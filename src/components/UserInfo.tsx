// import { useRequest } from 'ahooks'
import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import { getUserInfoService } from '@/services/user'
import { useGetUserInfo } from '@/hooks/useGetUserInfo'
import { UserOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import { removeToken } from '@/utils/user-token'
import { useDispatch } from 'react-redux'
import { logoutReducer } from '@/store/modules/userReducer'

const UserInfo: FC = () => {
  // const { data } = useRequest(getUserInfoService)
  // const { username, nickname } = data || {}
  const dispatch = useDispatch()
  const { username, nickname } = useGetUserInfo()
  const nav = useNavigate()

  function logout() {
    // 注销
    removeToken()
    dispatch(logoutReducer()) // 清空redux中的用户信息
    message.success('退出登录成功')
    nav('/login')
  }

  const UserInfo = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </>
  )

  const Login = <Link to={'/login'}>登录</Link>

  return <div>{username ? UserInfo : Login}</div>
}

export default UserInfo
