/**
 * 获取被删除组件的下一个组件的fe_id作为selectedId
 * @param fe_id  当前的id
 * @param componentList 组件列表
 */

import { ComponentInfoType, ComponentsListType } from '@/types/questionTypes'
import { ComponentStateType } from '.'
export function getNextSelectedIdByDeleteId(
  fe_id: string,
  componentsList: ComponentsListType
): string {
  // 只查看没有被隐藏的组件
  const visibleComponentsList = componentsList.filter(item => !item.isHidden)
  const idx = visibleComponentsList.findIndex(item => item.fe_id === fe_id)
  if (idx < 0) return ''

  const length = visibleComponentsList.length
  if (length <= 1) {
    // 组件列表原来就一个，删了就没有组件可以选中了
    return ''
  } else {
    if (idx === length - 1) {
      // 删除的是最后一个组件，则选中上一个
      return visibleComponentsList[idx - 1].fe_id
    } else {
      // 否则，选中下一个
      return visibleComponentsList[idx + 1].fe_id
    }
  }
}

/**
 * 获取选中组件的上一个组件的fe_id作为selectedId
 * @param fe_id  当前的id
 * @param componentList 组件列表
 */
export function getPreSelectedId(fe_id: string, componentsList: ComponentsListType): string {
  // 只查看没有被隐藏的组件
  const visibleComponentsList = componentsList.filter(item => !item.isHidden)
  const idx = visibleComponentsList.findIndex(item => item.fe_id === fe_id)
  if (idx < 0) return ''

  const length = visibleComponentsList.length
  if (idx === 0) {
    return visibleComponentsList[length - 1].fe_id
  } else {
    return visibleComponentsList[idx - 1].fe_id
  }
}

/**
 * 获取选中组件的上一个组件的fe_id作为selectedId
 * @param fe_id  当前的id
 * @param componentList 组件列表
 */
export function getNextSelectedId(fe_id: string, componentsList: ComponentsListType): string {
  // 只查看没有被隐藏的组件
  const visibleComponentsList = componentsList.filter(item => !item.isHidden)
  const idx = visibleComponentsList.findIndex(item => item.fe_id === fe_id)
  if (idx < 0) return ''

  const length = visibleComponentsList.length
  if (idx === length - 1) {
    return visibleComponentsList[0].fe_id
  } else {
    return visibleComponentsList[idx + 1].fe_id
  }
}

/**
 * 插入一个组件到组件列表中
 * @param state  仓库的状态
 * @param component 要插入的组件
 */
export function insertComponent(state: ComponentStateType, newComponent: ComponentInfoType) {
  const { selectedId, componentsList } = state
  const idx = componentsList.findIndex(item => item.fe_id === selectedId)
  if (idx < 0) {
    componentsList.push(newComponent)
  } else {
    componentsList.splice(idx + 1, 0, newComponent)
  }

  state.selectedId = newComponent.fe_id
}
