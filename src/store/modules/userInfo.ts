import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserInfoType } from '@/types/userTypes'

// 初始化状态

const inital: UserInfoType = {
  username: '',
  nickname: '',
}

const userInfoStore = createSlice({
  name: 'userInfo',
  initialState: inital,
  reducers: {
    loginReducer(state: UserInfoType, action: PayloadAction<UserInfoType>) {
      state.nickname = action.payload.nickname
      state.username = action.payload.username
    },
    logoutReducer() {
      return inital
    },
  },
})

export const { loginReducer, logoutReducer } = userInfoStore.actions
export default userInfoStore.reducer
