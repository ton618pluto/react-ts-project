import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type PageInfoType = {
  title: string
  isPublished: boolean
  desc?: string
  js?: string
  css?: string
}

const INIT_STATE: PageInfoType = {
  title: '',
  isPublished: true,
  desc: '',
  js: '',
  css: '',
}

const pageInfoStore = createSlice({
  name: 'pageInfo',
  initialState: INIT_STATE,
  reducers: {
    // 重置页面信息
    resetPageInfo(state: PageInfoType, action: PayloadAction<PageInfoType>) {
      return action.payload
    },
    // 修改问卷标题
    changeQuestionTitle(state: PageInfoType, action: PayloadAction<{ title: string }>) {
      state.title = action.payload.title
    },
  },
})

export const { resetPageInfo, changeQuestionTitle } = pageInfoStore.actions
export default pageInfoStore.reducer
