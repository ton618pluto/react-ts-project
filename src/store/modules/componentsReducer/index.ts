import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { ComponentInfoType } from '@/types/questionTypes'
import { ComponentsListType } from '@/types/questionTypes'

// 初始化状态
type ComponentStateType = {
  componentsList: ComponentsListType
}

const INIT_STATE: ComponentStateType = {
  componentsList: [],
}

const componentStore = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    resetComponents(state, action: PayloadAction<ComponentStateType>) {
      return action.payload
    },
  },
})

export const { resetComponents } = componentStore.actions
export default componentStore.reducer
