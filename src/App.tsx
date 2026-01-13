import React from 'react'
import './App.css'
// import List from './pages/manage/list'
import router from './router'
import { RouterProvider } from 'react-router-dom'
import 'antd/dist/reset.css'

function App() {
  // const a = 1
  return (
    // <div className="App">
    //   <h1 style={{ background: 'wheat' }}>问卷</h1>
    //   <List></List>
    // </div>
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
