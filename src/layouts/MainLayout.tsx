import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Logo from '../components/Logo'
import styles from './MainLayout.module.scss'
import UserInfo from '../components/UserInfo'
import { useLoadUserData } from '@/hooks/useLoadUserData'
import { useNavPage } from '@/hooks/useNavPage'
import { Layout, Spin } from 'antd'
const { Header, Content, Footer } = Layout

const MainLayout: FC = () => {
  const { waitingLoading } = useLoadUserData()
  useNavPage(waitingLoading)

  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo></Logo>
        </div>
        <div className={styles.right}>
          <UserInfo></UserInfo>
        </div>
      </Header>
      <Content className={styles.main}>
        {waitingLoading ? (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
            }}
          >
            <Spin size="large" tip="加载中...">
              <div style={{ padding: 50, background: 'rgba(0, 0, 0, 0.05)', borderRadius: 4 }} />
            </Spin>
          </div>
        ) : (
          <Outlet></Outlet>
        )}
      </Content>
      <Footer className={styles.footer}>小慕问卷 &copy; 2026 -presented by Ton618</Footer>
    </Layout>
  )
}

export default MainLayout
