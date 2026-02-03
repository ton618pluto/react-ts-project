import React, { FC, useEffect, useState } from 'react'
import { Tabs } from 'antd'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import RightPropComponent from './RightPropComponent'
import PageSetting from './PageSetting'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo'

// 枚举类型，方便统一修改
enum TAB_KEYS {
  PROP_KEY = 'prop',
  SETTING_KEY = 'setting',
}

const RightPanel: FC = () => {
  const [activeKey, setActiveKey] = useState(TAB_KEYS.PROP_KEY)
  const { selectedId } = useGetComponentInfo()

  useEffect(() => {
    if (selectedId) {
      setActiveKey(TAB_KEYS.PROP_KEY)
    } else {
      setActiveKey(TAB_KEYS.SETTING_KEY)
    }
  }, [selectedId])

  const tabsItem = [
    {
      key: TAB_KEYS.PROP_KEY,
      label: (
        <span>
          <FileTextOutlined></FileTextOutlined>
          属性
        </span>
      ),
      children: <RightPropComponent></RightPropComponent>,
    },
    {
      key: TAB_KEYS.SETTING_KEY,
      label: (
        <span>
          <SettingOutlined></SettingOutlined>
          页面设置
        </span>
      ),
      children: <PageSetting />,
    },
  ]
  return (
    <Tabs
      activeKey={activeKey}
      onChange={key => setActiveKey(key as TAB_KEYS)}
      items={tabsItem}
    ></Tabs>
  )
}

export default RightPanel
