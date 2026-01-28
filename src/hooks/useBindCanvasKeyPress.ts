import {
  copiedSelectedComponent,
  deleteComponent,
  pasteComponent,
  selectNextComponent,
  selectPreComponent,
} from '@/store/modules/componentsReducer'
import { useAppDispatch } from '@/store/types'
import { useKeyPress } from 'ahooks'
/**
 * @ 快捷键相关操作
 */

function isActiveElementValid() {
  const activeElement = document.activeElement
  if (activeElement === document.body) return true
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
}
