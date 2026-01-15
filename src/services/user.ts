import instance from './ajax'
import { AnyObjType } from './ajax'

// 获取用户信息
type UserInfoType = {
  username: string
  nickname: string
}
export const getUserInfoService = async () => {
  const data = await instance.get<UserInfoType>('/api/user/info')
  return data
}

// 注册
export const registerService = async (username: string, password: string, nickname?: string) => {
  const body = { username, password, nickname: nickname || username }
  const data = await instance.post<AnyObjType>('/api/user/register', body)
  return data
}

// 登录
type TokenType = {
  token: string
}
export const loginService = async (username: string, password: string) => {
  const body = { username, password }
  const data = await instance.post<TokenType>('/api/user/login', body)
  return data
}
