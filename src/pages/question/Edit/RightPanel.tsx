import React, { FC } from 'react'
import { Tabs } from 'antd'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import PropComponent from './PropComponent'

const RightPanel: FC = () => {
  const tabsItem = [
    {
      key: 'prop',
      label: (
        <span>
          <FileTextOutlined></FileTextOutlined>
          属性
        </span>
      ),
      children: <PropComponent></PropComponent>,
    },
    {
      key: 'setting',
      label: (
        <span>
          <SettingOutlined></SettingOutlined>
          页面设置
        </span>
      ),
      children: <div>页面设置</div>,
    },
  ]
  return <Tabs defaultActiveKey="componentLib" items={tabsItem}></Tabs>
}

export default RightPanel
