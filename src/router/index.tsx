import { createBrowserRouter } from 'react-router-dom'
import React from 'react'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import Register from '../pages/Register'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import ManageLayout from '../layouts/ManageLayout'
import List from '../pages/manage/list'
import Star from '../pages/manage/Star'
import Trash from '../pages/manage/Trash'
import QuestionLayout from '../layouts/QuestionLayout'
import Edit from '../pages/question/Edit'
import Stat from '../pages/question/Stat'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: 'register',
        element: <Register></Register>,
      },
      {
        path: 'login',
        element: <Login></Login>,
      },
      {
        path: 'manage',
        element: <ManageLayout></ManageLayout>,
        children: [
          {
            path: 'list',
            // index: true,
            element: <List></List>,
          },
          {
            path: 'star',
            element: <Star></Star>,
          },
          {
            path: 'trash',
            element: <Trash></Trash>,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound></NotFound>,
      },
    ],
  },
  {
    path: 'question',
    element: <QuestionLayout></QuestionLayout>,
    children: [
      {
        path: 'edit/:id',
        element: <Edit></Edit>,
      },
      {
        path: 'stat/:id',
        element: <Stat></Stat>,
      },
    ],
  },
])

export default router

// 其他内容
export function isLoginOrRegister(pathname: string) {
  return ['/login', '/register'].includes(pathname) ? true : false
}

export function isNoNeedLogin(pathname: string) {
  return ['/', '/login', '/register'].includes(pathname) ? true : false
}
