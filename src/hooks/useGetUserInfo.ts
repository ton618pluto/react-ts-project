import { useAppSelector } from '@/store/types'

export function useGetUserInfo() {
  const { username, nickname } = useAppSelector(state => state.userInfo)

  return {
    username,
    nickname,
  }
}
