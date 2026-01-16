import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type UserInfoType = {
  username: string
  nickname: string
}

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
