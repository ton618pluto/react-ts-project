import { createHashRouter } from 'react-router-dom'
import React from 'react'
import MainLayout from '../layouts/MainLayout'
import ManageLayout from '../layouts/ManageLayout'
import QuestionLayout from '../layouts/QuestionLayout'

const Home = React.lazy(() => import(/* webpackChunkName: "home" */ '../pages/Home'))
const Register = React.lazy(() => import(/* webpackChunkName: "register" */ '../pages/Register'))
const Login = React.lazy(() => import(/* webpackChunkName: "login" */ '../pages/Login'))
const NotFound = React.lazy(() => import(/* webpackChunkName: "notFound" */ '../pages/NotFound'))
const List = React.lazy(() => import(/* webpackChunkName: "list" */ '../pages/manage/list'))
const Star = React.lazy(() => import(/* webpackChunkName: "star" */ '../pages/manage/Star'))
const Trash = React.lazy(() => import(/* webpackChunkName: "trash" */ '../pages/manage/Trash'))
const Edit = React.lazy(() => import(/* webpackChunkName: "editPage" */ '../pages/question/Edit'))
const Stat = React.lazy(() => import(/* webpackChunkName: "statPage" */ '../pages/question/Stat'))

const router = createHashRouter([
  {
    path: '/',
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <MainLayout />
      </React.Suspense>
    ),
    children: [
      {
        path: '/',
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <Home></Home>
          </React.Suspense>
        ),
      },
      {
        path: 'register',
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <Register></Register>
          </React.Suspense>
        ),
      },
      {
        path: 'login',
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <Login></Login>
          </React.Suspense>
        ),
      },
      {
        path: 'manage',
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <ManageLayout></ManageLayout>
          </React.Suspense>
        ),
        children: [
          {
            path: 'list',
            element: (
              <React.Suspense fallback={<div>Loading...</div>}>
                <List></List>
              </React.Suspense>
            ),
          },
          {
            path: 'star',
            element: (
              <React.Suspense fallback={<div>Loading...</div>}>
                <Star></Star>
              </React.Suspense>
            ),
          },
          {
            path: 'trash',
            element: (
              <React.Suspense fallback={<div>Loading...</div>}>
                <Trash></Trash>
              </React.Suspense>
            ),
          },
        ],
      },
      {
        path: '*',
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <NotFound></NotFound>
          </React.Suspense>
        ),
      },
    ],
  },
  {
    path: 'question',
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <QuestionLayout></QuestionLayout>
      </React.Suspense>
    ),
    children: [
      {
        path: 'edit/:id',
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <Edit></Edit>
          </React.Suspense>
        ),
      },
      {
        path: 'stat/:id',
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <Stat></Stat>
          </React.Suspense>
        ),
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
