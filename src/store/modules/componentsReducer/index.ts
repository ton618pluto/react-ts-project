import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { ComponentInfoType } from '@/types/questionTypes'
import { ComponentsListType, ComponentInfoType, ComponentPropsType } from '@/types/questionTypes'

// 初始化状态
type ComponentStateType = {
  componentsList: ComponentsListType
  selectedId: string
}

const INIT_STATE: ComponentStateType = {
  componentsList: [],
  selectedId: '',
}

const componentStore = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 重置问卷的组件列表
    resetComponents(state, action: PayloadAction<ComponentStateType>) {
      return action.payload
    },
    // 改变画布中选中的组件
    changeSelectedId(state: ComponentStateType, action: PayloadAction<string>) {
      state.selectedId = action.payload
    },
    // 添加一个组件到画布中
    addComponent(state: ComponentStateType, action: PayloadAction<ComponentInfoType>) {
      const { selectedId, componentsList } = state
      const newComponent = action.payload

      const idx = componentsList.findIndex(item => item.fe_id === selectedId)
      if (idx < 0) {
        componentsList.push(newComponent)
      } else {
        componentsList.splice(idx + 1, 0, newComponent)
      }

      state.selectedId = newComponent.fe_id
    },
    // 修改某个组件的props
    changeComponentProp(
      state: ComponentStateType,
      action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
    ) {
      const { fe_id, newProps } = action.payload
      const component = state.componentsList.find(item => item.fe_id === fe_id)
      if (component) {
        component.props = { ...component.props, ...newProps }
      }
    },
  },
})

export const { resetComponents, changeSelectedId, addComponent, changeComponentProp } =
  componentStore.actions
export default componentStore.reducer
