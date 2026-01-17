import React, { FC } from 'react'
import { Spin } from 'antd'
import styles from './EditCanvas.module.scss'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo'
import { ComponentInfoType } from '@/types/questionTypes'
import { getComponentConfByType } from '@/components/questionComponents'

type PropsType = {
  loading: boolean
}

function getComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo
  // 根据type获取对应的函数组件
  const componentConf = getComponentConfByType(type)
  if (!componentConf) return
  const { Component } = componentConf

  return <Component {...props}></Component>
}

const EditCanvas: FC<PropsType> = (props: PropsType) => {
  const { componentsList } = useGetComponentInfo()

  if (props.loading) {
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin size="large" tip="加载中...">
          <div style={{ padding: 50, borderRadius: 4 }} />
        </Spin>
      </div>
    )
  }

  return (
    <div className={styles.canvas}>
      {componentsList.map(item => {
        const { fe_id } = item

        return (
          <div className={styles['component-wrapper']} key={fe_id}>
            <div className={styles.component}>{getComponent(item)}</div>
          </div>
        )
      })}
    </div>
  )
}

export default EditCanvas
