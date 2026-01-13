import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Logo from '../components/Logo'
import styles from './MainLayout.module.scss'
import UserInfo from '../components/UserInfo'
import { Layout } from 'antd'
const { Header, Content, Footer } = Layout

const MainLayout: FC = () => {
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
        <Outlet></Outlet>
      </Content>
      <Footer className={styles.footer}>小慕问卷 &copy; 2026 -presented by Ton618</Footer>
    </Layout>
  )
}

export default MainLayout
