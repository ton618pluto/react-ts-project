import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Spin } from 'antd'
import { useLoadUserData } from '@/hooks/useLoadUserData'
import { useNavPage } from '@/hooks/useNavPage'

const QuestionLayout: FC = () => {
  const { waitingLoading } = useLoadUserData()
  useNavPage(waitingLoading)

  return (
    <div style={{ height: '100vh' }}>
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
    </div>
  )
}

export default QuestionLayout
