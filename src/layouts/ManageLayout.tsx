import React, { FC } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import styles from './ManageLayout.module.scss'
import { Button, Space, Divider } from 'antd'
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'

const ManageLayout: FC = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space orientation="vertical">
          <Button type="primary" size="large" icon={<PlusOutlined></PlusOutlined>}>
            创建问卷
          </Button>
          <Divider style={{ borderTop: 'transparent' }}></Divider>
          <Button
            size="large"
            type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
            icon={<BarsOutlined></BarsOutlined>}
            onClick={() => navigate('/manage/list')}
          >
            我的问卷
          </Button>
          <Button
            size="large"
            type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
            icon={<StarOutlined></StarOutlined>}
            onClick={() => navigate('/manage/star')}
          >
            星标问卷
          </Button>
          <Button
            size="large"
            type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
            icon={<DeleteOutlined></DeleteOutlined>}
            onClick={() => navigate('/manage/trash')}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default ManageLayout
