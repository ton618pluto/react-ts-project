import React, { ChangeEvent, FC, useState } from 'react'
import styles from './EditHeader.module.scss'
import { Button, Typography, Space, Input, message } from 'antd'
import { LeftOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons'
import EditToolbar from './EditToolbar'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetPageInfo } from '@/hooks/useGetPageInfo'
import { useAppDispatch } from '@/store/types'
import { changeQuestionTitle } from '@/store/modules/pageInfoReducer'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo'
import { useDebounceEffect, useKeyPress, useRequest } from 'ahooks'
import { updateQuestionService } from '@/services/question'

const { Title } = Typography

// 标题相关部分组件
const TitleElem: FC = () => {
  const { title } = useGetPageInfo()
  const [editFlag, setEditFlag] = useState(false)
  const dispatch = useAppDispatch()

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    const title = event.target.value.trim()
    dispatch(changeQuestionTitle({ title }))
  }

  if (editFlag) {
    return (
      <Input
        value={title}
        onPressEnter={() => setEditFlag(false)}
        onBlur={() => setEditFlag(false)}
        onChange={handleTitleChange}
      />
    )
  } else {
    return (
      <Space>
        <Title>{title}</Title>
        <Button type="text" icon={<EditOutlined />} onClick={() => setEditFlag(true)}></Button>
      </Space>
    )
  }
}

// 保存组件
const SaveButton: FC = () => {
  const pageInfo = useGetPageInfo()
  const { componentsList } = useGetComponentInfo()
  const { id } = useParams()
  const data = { ...pageInfo, componentsList }

  // 手动保存
  const { loading, run: save } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionService(id, data)
    },
    { manual: true }
  )

  // 快捷键保存
  useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
    event.preventDefault()
    if (!loading) save()
  })

  // 自动保存，用防抖，不然改一次保存一次，服务器压力太大了
  useDebounceEffect(
    () => {
      save()
    },
    [pageInfo, componentsList],
    { wait: 1000 }
  )

  return (
    <Button icon={loading ? <LoadingOutlined /> : ''} onClick={save} disabled={loading}>
      保存
    </Button>
  )
}

// 发布按钮的组件
const PublishButton: FC = () => {
  const pageInfo = useGetPageInfo()
  const { componentsList } = useGetComponentInfo()
  const { id } = useParams()
  const data = { ...pageInfo, componentsList, isPublished: true }
  const nav = useNavigate()

  // 手动保存
  const { loading, run: publish } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionService(id, data)
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('发布成功')
        nav(`/question/stat/${id}`)
      },
    }
  )
  return (
    <Button
      type="primary"
      onClick={publish}
      icon={loading ? <LoadingOutlined /> : ''}
      disabled={loading}
    >
      发布
    </Button>
  )
}

const EditHeader: FC = () => {
  const nav = useNavigate()

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles['header']}>
        <div className={styles['left']}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <TitleElem></TitleElem>
          </Space>
        </div>
        <div className={styles['main']}>
          <EditToolbar></EditToolbar>
        </div>
        <div className={styles['right']}>
          <Space>
            <SaveButton></SaveButton>
            <PublishButton></PublishButton>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
