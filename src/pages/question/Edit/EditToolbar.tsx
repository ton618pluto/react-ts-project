import React, { FC } from 'react'
import { Space, Button, Tooltip, message } from 'antd'
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  CopyOutlined,
  BlockOutlined,
  UpOutlined,
  DownOutlined,
  UndoOutlined,
  RedoOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons'
import { useAppDispatch } from '@/store/types'
import {
  changeComponentHidden,
  changeComponentLock,
  copiedSelectedComponent,
  deleteComponent,
  moveComponentPosition,
  pasteComponent,
  togglePreviewMode,
} from '@/store/modules/componentsReducer'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo'
import {
  getNextSelectedIdxByCurIdx,
  getPreSelectedIdxByCurIdx,
} from '@/store/modules/componentsReducer/utils'
import { ActionCreators } from 'redux-undo'

const EditToolbar: FC = () => {
  const dispatch = useAppDispatch()
  const {
    selectedId,
    selectedComponent,
    copiedComponent,
    visibleComponnents,
    componentsList,
    previewMode,
  } = useGetComponentInfo()
  const { isLocked } = selectedComponent || {}
  const length = visibleComponnents.length

  const idx = componentsList.findIndex(item => item.fe_id === selectedId)
  const visible_idx = visibleComponnents.findIndex(item => item.fe_id === selectedId)
  const selectedFlag = visible_idx === -1
  const isFirst = visible_idx === 0 && !!selectedId
  const isLast = visible_idx === length - 1 && !!selectedId

  function handleDel() {
    dispatch(deleteComponent())
  }

  function handleVisible() {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }))
  }

  function handleLock() {
    dispatch(changeComponentLock({ fe_id: selectedId }))
  }

  function handleCopy() {
    dispatch(copiedSelectedComponent())
  }

  function handlePaste() {
    dispatch(pasteComponent())
  }

  function handleUp() {
    if (isFirst) return
    const newIndex = getPreSelectedIdxByCurIdx(idx, componentsList)
    if (newIndex === -1 || idx === -1) return
    dispatch(moveComponentPosition({ oldIndex: idx, newIndex }))
  }

  function handleDown() {
    if (isLast) return
    const newIndex = getNextSelectedIdxByCurIdx(idx, componentsList)
    if (newIndex === -1 || idx === -1) return
    dispatch(moveComponentPosition({ oldIndex: idx, newIndex }))
  }

  function handleUndo() {
    dispatch(ActionCreators.undo())
  }

  function handleRedo() {
    dispatch(ActionCreators.redo())
  }

  function handlePreview() {
    if (!previewMode) {
      message.info('已进入预览模式，可点击顶部按钮退出')
    }
    dispatch(togglePreviewMode())
  }

  const previewButton = (
    <Tooltip title={previewMode ? '退出预览' : '预览问卷'}>
      <Button
        shape="circle"
        icon={<PlayCircleOutlined />}
        onClick={handlePreview}
        type={previewMode ? 'primary' : 'default'}
      >
        {previewMode ? '退出预览' : '预览'}
      </Button>
    </Tooltip>
  )

  if (previewMode) {
    return <Space>{previewButton}</Space>
  }

  return (
    <Space>
      <Tooltip title="删除-delete/backspace">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDel}></Button>
      </Tooltip>
      <Tooltip title="隐藏">
        <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handleVisible}></Button>
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          shape="circle"
          icon={<LockOutlined />}
          onClick={handleLock}
          type={isLocked ? 'primary' : 'default'}
        ></Button>
      </Tooltip>
      <Tooltip title="复制-ctrl+c">
        <Button
          shape="circle"
          icon={<CopyOutlined />}
          onClick={handleCopy}
          disabled={selectedFlag}
        ></Button>
      </Tooltip>
      <Tooltip title="粘贴-ctrl+v">
        <Button
          shape="circle"
          icon={<BlockOutlined />}
          onClick={handlePaste}
          disabled={copiedComponent === null}
        ></Button>
      </Tooltip>
      <Tooltip title="上移-uparrow">
        <Button
          shape="circle"
          icon={<UpOutlined />}
          onClick={handleUp}
          disabled={isFirst || selectedFlag}
        ></Button>
      </Tooltip>
      <Tooltip title="下移-downarrow">
        <Button
          shape="circle"
          icon={<DownOutlined />}
          onClick={handleDown}
          disabled={isLast || selectedFlag}
        ></Button>
      </Tooltip>
      <Tooltip title="撤销-ctrl+z">
        <Button shape="circle" icon={<UndoOutlined />} onClick={handleUndo}></Button>
      </Tooltip>
      <Tooltip title="重做-ctrl+y/ctrl+shift+z">
        <Button shape="circle" icon={<RedoOutlined />} onClick={handleRedo}></Button>
      </Tooltip>
      {previewButton}
    </Space>
  )
}

export default EditToolbar
