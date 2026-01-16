import { isLoginOrRegister, isNoNeedLogin } from '@/router'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useGetUserInfo } from './useGetUserInfo'

export function useNavPage(waitLoadingUser: boolean) {
  const { pathname } = useLocation()
  const { username } = useGetUserInfo()
  const nav = useNavigate()

  useEffect(() => {
    if (waitLoadingUser) return

    if (username) {
      // 已经登录
      if (isLoginOrRegister(pathname)) {
        nav('/manage/list')
        return
      }
    } else {
      // 未登录

      if (!isNoNeedLogin(pathname)) {
        nav('/login')
      }
    }
  }, [username, pathname])
}
