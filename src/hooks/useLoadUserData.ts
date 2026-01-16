import { useEffect, useState } from 'react'
import { useRequest } from 'ahooks'
import { useGetUserInfo } from './useGetUserInfo'
import { getUserInfoService } from '@/services/user'
import { useAppDispatch } from '@/store/types'
import { loginReducer } from '@/store/modules/userInfo'

export function useLoadUserData() {
  const [waitingLoading, setWaitingLoading] = useState(true)
  const { username } = useGetUserInfo()
  const dispatch = useAppDispatch()

  //   发送ajax请求
  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      const { username, nickname } = result
      dispatch(loginReducer({ username, nickname }))
    },
    onFinally() {
      setWaitingLoading(false)
    },
  })

  useEffect(() => {
    // 有用户信息了，则不必发送
    if (username) {
      setWaitingLoading(false)
      return
    }

    run()
  }, [username])

  return {
    waitingLoading,
  }
}
