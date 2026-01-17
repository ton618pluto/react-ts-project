import { configureStore } from '@reduxjs/toolkit'
import userInfoStore from './modules/userInfo'
import componentStore from './modules/componentsReducer'

const store = configureStore({
  reducer: {
    userInfo: userInfoStore,
    components: componentStore,
  },
})

export default store
// 从 store 本身推断出 `RootState` 和 `AppDispatch` 类型

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
