import React, { FC } from 'react'
import { Space, Button, Tooltip } from 'antd'
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  CopyOutlined,
  BlockOutlined,
} from '@ant-design/icons'
import { useAppDispatch } from '@/store/types'
import {
  changeComponentHidden,
  changeComponentLock,
  copiedSelectedComponent,
  deleteComponent,
  pasteComponent,
} from '@/store/modules/componentsReducer'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo'

const EditToolbar: FC = () => {
  const dispatch = useAppDispatch()
  const { selectedId, selectedComponent, copiedComponent } = useGetComponentInfo()
  const { isLocked } = selectedComponent || {}

  //   删除组件
  function handleDel() {
    dispatch(deleteComponent())
  }

  //   隐藏组件
  function handleVisible() {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }))
  }

  // 锁定组件
  function handleLock() {
    dispatch(changeComponentLock())
  }

  // 复制组件
  function handleCopy() {
    // 复制
    dispatch(copiedSelectedComponent())
  }

  // 粘贴组件
  function handlePaste() {
    // 粘贴
    dispatch(pasteComponent())
  }

  return (
    <Space>
      <Tooltip title="删除">
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
      <Tooltip title="复制">
        <Button shape="circle" icon={<CopyOutlined />} onClick={handleCopy}></Button>
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          shape="circle"
          icon={<BlockOutlined />}
          onClick={handlePaste}
          disabled={copiedComponent === null}
        ></Button>
      </Tooltip>
    </Space>
  )
}

export default EditToolbar
