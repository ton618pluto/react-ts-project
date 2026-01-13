import React, { FC, useState } from 'react'
import { useTitle } from 'ahooks'
import { Typography, Empty, Table, Tag, Button, Space, Modal } from 'antd'
import styles from './common.module.scss'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ListSearch from '../../components/ListSearch'

const rawQuestionList = [
  {
    _id: 'q1',
    title: '问卷1',
    isPublished: false,
    isStar: true,
    answerCount: 5,
    createdAt: '2月10日 13:23',
  },
  {
    _id: 'q2',
    title: '问卷2',
    isPublished: true,
    isStar: false,
    answerCount: 5,
    createdAt: '2月11日 14:23',
  },
  {
    _id: 'q3',
    title: '问卷3',
    isPublished: false,
    isStar: true,
    answerCount: 5,
    createdAt: '2月12日 13:23',
  },
]

const { Title } = Typography
const { confirm } = Modal

const Trash: FC = () => {
  useTitle('小慕问卷 - 回收站')
  const [questionList] = useState(rawQuestionList)
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
      onOk: () => alert('删除成功'),
    })
  }

  // 把jsx片段定义成一个变量
  const TableElement = (
    <>
      <div>
        <Space style={{ marginBottom: '16px' }}>
          <Button type="primary" disabled={selectedIds.length === 0}>
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
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 && <Empty description="暂无数据..."></Empty>}
        {questionList.length && TableElement}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  )
}

export default Trash
