import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { ComponentInfoType } from '@/types/questionTypes'
import { ComponentsListType, ComponentInfoType, ComponentPropsType } from '@/types/questionTypes'
import {
  getNextSelectedId,
  getNextSelectedIdByDeleteId,
  getPreSelectedId,
  insertComponent,
} from './utils'
import cloneDeep from 'lodash.clonedeep'
import { nanoid } from 'nanoid'

// 初始化状态
export type ComponentStateType = {
  componentsList: ComponentsListType
  selectedId: string
  copiedComponent: ComponentInfoType | null
}

const INIT_STATE: ComponentStateType = {
  componentsList: [],
  selectedId: '',
  copiedComponent: null,
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
      const newComponent = action.payload
      insertComponent(state, newComponent)
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
    // 删除一个组件
    deleteComponent(state: ComponentStateType) {
      const { selectedId: cur_id } = state
      const idx = state.componentsList.findIndex(item => item.fe_id === cur_id)

      const nextSelectedId = getNextSelectedIdByDeleteId(cur_id, state.componentsList)
      state.selectedId = nextSelectedId

      if (idx > -1) {
        state.componentsList.splice(idx, 1)
      }
    },
    // 改变组件的显示和隐藏
    changeComponentHidden(
      state: ComponentStateType,
      action: PayloadAction<{ fe_id: string; isHidden: boolean }>
    ) {
      const { selectedId: cur_id, componentsList } = state
      const cur_component = componentsList.find(item => item.fe_id === cur_id)
      if (!cur_component) return

      // 改变selectedId
      let nextId = ''
      const { isHidden, fe_id } = action.payload
      if (isHidden) {
        // 要隐藏
        nextId = getNextSelectedIdByDeleteId(cur_id, componentsList)
      } else {
        // 要显示
        nextId = fe_id
      }

      state.selectedId = nextId

      cur_component.isHidden = isHidden
    },
    // 锁定或解锁一个组件
    changeComponentLock(state: ComponentStateType) {
      const { selectedId, componentsList } = state
      const component = componentsList.find(item => item.fe_id === selectedId)
      if (component) {
        component.isLocked = !component.isLocked
      }
    },
    // 复制一个组件
    copiedSelectedComponent(state: ComponentStateType) {
      const { selectedId, componentsList } = state
      const component = componentsList.find(item => item.fe_id === selectedId)
      if (component) {
        state.copiedComponent = cloneDeep(component)
      }
    },
    // 粘贴一个组件
    pasteComponent(state: ComponentStateType) {
      const { copiedComponent } = state

      if (copiedComponent) {
        copiedComponent.fe_id = nanoid()
        insertComponent(state, copiedComponent)
      }
    },
    // 选中上一个组件
    selectPreComponent(state: ComponentStateType) {
      const { selectedId, componentsList } = state
      const pre_id = getPreSelectedId(selectedId, componentsList)
      state.selectedId = pre_id
    },
    // 选中下一个组件
    selectNextComponent(state: ComponentStateType) {
      const { selectedId, componentsList } = state
      const next_id = getNextSelectedId(selectedId, componentsList)
      state.selectedId = next_id
    },
  },
})

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProp,
  deleteComponent,
  changeComponentHidden,
  changeComponentLock,
  copiedSelectedComponent,
  pasteComponent,
  selectPreComponent,
  selectNextComponent,
} = componentStore.actions
export default componentStore.reducer
