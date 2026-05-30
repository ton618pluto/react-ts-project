import {
  copiedSelectedComponent,
  deleteComponent,
  pasteComponent,
  selectNextComponent,
  selectPreComponent,
} from '@/store/modules/componentsReducer'
import { useGetComponentInfo } from './useGetComponentInfo'
import { useAppDispatch } from '@/store/types'
import { useKeyPress } from 'ahooks'
import { ActionCreators } from 'redux-undo'

function isActiveElementValid() {
  const activeElement = document.activeElement

  if (activeElement?.matches("div[role='button']") || activeElement === document.body) return true

  return false
}

export function useBindCanvasKeyPress() {
  const dispatch = useAppDispatch()
  const { previewMode } = useGetComponentInfo()

  useKeyPress(['delete', 'backspace'], () => {
    if (previewMode || !isActiveElementValid()) return
    dispatch(deleteComponent())
  })

  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (previewMode || !isActiveElementValid()) return
    dispatch(copiedSelectedComponent())
  })

  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (previewMode || !isActiveElementValid()) return
    dispatch(pasteComponent())
  })

  useKeyPress(['uparrow'], () => {
    if (previewMode || !isActiveElementValid()) return
    dispatch(selectPreComponent())
  })

  useKeyPress(['downarrow'], () => {
    if (previewMode || !isActiveElementValid()) return
    dispatch(selectNextComponent())
  })

  useKeyPress(
    ['ctrl.z', 'meta.z'],
    () => {
      if (previewMode || !isActiveElementValid()) return
      dispatch(ActionCreators.undo())
    },
    { exactMatch: true }
  )

  useKeyPress(['ctrl.y', 'ctrl.shift.z', 'meta.y', 'meta.shift.z'], () => {
    if (previewMode || !isActiveElementValid()) return
    dispatch(ActionCreators.redo())
  })
}
