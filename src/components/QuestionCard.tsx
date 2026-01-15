import React, { FC, useState } from 'react'
import styles from './QuestionCard.module.scss'
import { Button, Space, Divider, Tag, Popconfirm, Modal, message } from 'antd'
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import { useNavigate, Link } from 'react-router-dom'
import { updateQuestionService, duplicateQuestionService } from '../services/question'
import { useRequest } from 'ahooks'

const { confirm } = Modal

type PropsType = {
  _id: string
  title: string
  isStar: boolean
  isPublished: boolean
  answerCount: number
  createdAt: string
  isDeleted: boolean
}

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const { _id, title, createdAt, answerCount, isPublished, isStar, isDeleted } = props
  const [isStarState, setIsStarState] = useState(isStar)
  const navigate = useNavigate()

  // 标星或取消标星
  const { loading: starLoading, run: changeStar } = useRequest(
    async () => {
      await updateQuestionService(_id, { isStar: !isStarState })
    },
    {
      manual: true,
      onSuccess() {
        message.success('更新成功')
        setIsStarState(!isStarState)
      },
    }
  )

  // 复制问卷
  const { loading: duplicateLoading, run: duplicate } = useRequest(
    async () => {
      const data = await duplicateQuestionService(_id)
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        message.success('复制成功')
        navigate(`/question/edit/${result.id}`)
      },
    }
  )

  // 删除问卷
  const [isDeletedState, setIsDeletedState] = useState(isDeleted)
  function del() {
    confirm({
      title: '确定删除该问卷吗？',
      icon: <ExclamationCircleOutlined />,
      onOk: deleteQuestion,
    })
  }
  const { loading: deletedLoading, run: deleteQuestion } = useRequest(
    async () => await updateQuestionService(_id, { isDeleted: isDeletedState }),
    {
      manual: true,
      onSuccess() {
        message.success('删除成功')
        setIsDeletedState(true)
      },
    }
  )

  if (isDeletedState) return null

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.left}>
            <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
              <Space>
                {isStarState && <StarOutlined style={{ color: 'red' }}></StarOutlined>}
                {title}
              </Space>
            </Link>
          </div>
          <div className={styles.right}>
            <Space>
              {isPublished ? <Tag color={'processing'}>已发布</Tag> : <Tag>未发布</Tag>}
              <span>答卷：{answerCount}</span>
              <span>{createdAt}</span>
            </Space>
          </div>
        </div>
        <Divider style={{ margin: '12px' }}></Divider>
        <div className={styles['button-container']}>
          <div className={styles.left}>
            <Space>
              <Button
                type="text"
                size="small"
                icon={<EditOutlined></EditOutlined>}
                onClick={() => navigate(`/question/edit/${_id}`)}
              >
                编辑问卷
              </Button>
              <Button
                type="text"
                size="small"
                icon={<LineChartOutlined></LineChartOutlined>}
                onClick={() => navigate(`/question/stat/${_id}`)}
                disabled={!isPublished}
              >
                数据统计
              </Button>
            </Space>
          </div>
          <div className={styles.right}>
            <Button
              type="text"
              size="small"
              icon={<StarOutlined></StarOutlined>}
              disabled={starLoading}
              onClick={changeStar}
            >
              {isStarState ? '取消标星' : '标星'}
            </Button>
            <Popconfirm
              title="确定复制改问卷？"
              okText="确定"
              cancelText="取消"
              onConfirm={duplicate}
            >
              <Button
                type="text"
                size="small"
                icon={<CopyOutlined></CopyOutlined>}
                disabled={duplicateLoading}
              >
                复制
              </Button>
            </Popconfirm>
            <Button
              type="text"
              size="small"
              icon={<DeleteOutlined></DeleteOutlined>}
              onClick={del}
              disabled={deletedLoading}
            >
              删除
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default QuestionCard
