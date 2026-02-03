import {
  copiedSelectedComponent,
  deleteComponent,
  pasteComponent,
  selectNextComponent,
  selectPreComponent,
} from '@/store/modules/componentsReducer'
import { useAppDispatch } from '@/store/types'
import { useKeyPress } from 'ahooks'
import { ActionCreators } from 'redux-undo'
/**
 * @ 快捷键相关操作
 */

function isActiveElementValid() {
  const activeElement = document.activeElement

  // dnd-kit会将activeElement改掉，导致这里不等于document.body
  // if (activeElement === document.body) return true  // 光标foucs到页面上且非Input，则可以进行操作
  // 增加了dnd-kit以后，改成下面的写法
  if (activeElement?.matches("div[role='button']") || activeElement === document.body) return true

  return false
}

export function useBindCanvasKeyPress() {
  const dispatch = useAppDispatch()

  // 快捷键删除
  useKeyPress(['delete', 'backspace'], () => {
    if (!isActiveElementValid()) return
    dispatch(deleteComponent())
  })

  //   快捷键复制
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!isActiveElementValid()) return
    dispatch(copiedSelectedComponent())
  })

  // 快捷键粘贴
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!isActiveElementValid()) return
    dispatch(pasteComponent())
  })

  // 快捷键选中上一个
  useKeyPress(['uparrow'], () => {
    if (!isActiveElementValid()) return
    dispatch(selectPreComponent())
  })

  // 快捷键选中下一个
  useKeyPress(['downarrow'], () => {
    if (!isActiveElementValid()) return
    dispatch(selectNextComponent())
  })

  // 撤销
  useKeyPress(
    ['ctrl.z', 'meta.z'],
    () => {
      if (!isActiveElementValid()) return
      dispatch(ActionCreators.undo())
    },
    { exactMatch: true } // 严格匹配，必须只按了ctrl+z才行，防止匹配到重做的ctrl+shift+z
  )

  // 重做
  useKeyPress(['ctrl.y', 'ctrl.shift.z', 'meta.y', 'meta.shift.z'], () => {
    if (!isActiveElementValid()) return
    dispatch(ActionCreators.redo())
  })
}
