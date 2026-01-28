import React, { FC, useState } from 'react'
import { useRequest, useTitle } from 'ahooks'
import { Typography, Empty, Table, Tag, Button, Space, Modal, Spin, message } from 'antd'
import styles from './common.module.scss'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ListSearch from '../../components/ListSearch'
import { useLoadQuestionListData } from '../../hooks/useLoadQuestionListData'
import ListPage from '../../components/ListPage'
import { deleteQuestionService, updateQuestionService } from '../../services/question'

const { Title } = Typography
const { confirm } = Modal

const Trash: FC = () => {
  useTitle('小慕问卷 - 回收站')
  const { data, loading, refresh } = useLoadQuestionListData({ isDeleted: true })
  const { list: questionList = [], total = 100 } = data || {}
  const tableColumns = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render(isPublished: boolean) {
        return isPublished ? <Tag color={'processing'}>已发布</Tag> : <Tag>未发布</Tag>
      },
    },
    {
      title: '答卷',
      dataIndex: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
  ]

  // 选择的id
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  // 删除问卷
  const del = () => {
    confirm({
      title: '确定彻底删除该问卷吗？',
      icon: <ExclamationCircleOutlined />,
      content: '删除以后不可找回',
      onOk: () => deleteQuestion(),
    })
  }

  // 恢复问卷
  const { run: recoverQuestion } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateQuestionService(id, { isDeleted: false })
      }
    },
    {
      manual: true,
      debounceWait: 300,
      onSuccess() {
        message.success('恢复问卷成功')
        refresh()
        setSelectedIds([])
      },
    }
  )

  // 彻底删除问卷
  const { run: deleteQuestion } = useRequest(
    async () => {
      await deleteQuestionService(selectedIds)
    },
    {
      manual: true,
      debounceWait: 300,
      onSuccess() {
        message.success('删除问卷成功')
        refresh()
        setSelectedIds([])
      },
    }
  )

  // 把jsx片段定义成一个变量
  const TableElement = (
    <>
      <div>
        <Space style={{ marginBottom: '16px' }}>
          <Button type="primary" disabled={selectedIds.length === 0} onClick={recoverQuestion}>
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={del}>
            彻底删除
          </Button>
        </Space>
        <Table
          dataSource={questionList}
          columns={tableColumns}
          pagination={false}
          rowKey={q => q._id}
          rowSelection={{
            type: 'checkbox',
            onChange: selectedRowKeys => {
              // console.log(selectedRowKeys)
              setSelectedIds(selectedRowKeys as string[])
            },
          }}
        ></Table>
      </div>
    </>
  )

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin></Spin>
          </div>
        )}
        {!loading && questionList.length === 0 && <Empty description="暂无数据..."></Empty>}
        {!loading && questionList.length > 0 && TableElement}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  )
}

export default Trash
