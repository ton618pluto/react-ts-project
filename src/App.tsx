import React from 'react'
import './App.css'
import router from './router'
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import 'antd/dist/reset.css'

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#4ECDC4',
          colorSuccess: '#7ED6A4',
          colorBgContainer: '#fafafa',
          colorBgElevated: '#ffffff',
          colorText: '#2C5F52',
          colorTextSecondary: '#6B8E8A',
          colorBorder: '#B8D4D0',
        },
      }}
    >
      <RouterProvider router={router}></RouterProvider>
    </ConfigProvider>
  )
}

export default App
