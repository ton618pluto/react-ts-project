import React, { FC, MouseEvent } from 'react'
import { Spin } from 'antd'
import styles from './EditCanvas.module.scss'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo'
import { ComponentInfoType } from '@/types/questionTypes'
import { getComponentConfByType } from '@/components/questionComponents'
import { useAppDispatch } from '@/store/types'
import { changeSelectedId } from '@/store/modules/componentsReducer'
import classNames from 'classnames'

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
  if (props.loading) {
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin size="large" tip="加载中...">
          <div style={{ padding: 50, borderRadius: 4 }} />
        </Spin>
      </div>
    )
  }

  const { componentsList, selectedId } = useGetComponentInfo()
  const dispatch = useAppDispatch()

  function handleClick(e: MouseEvent, id: string) {
    e.stopPropagation()
    dispatch(changeSelectedId(id))
  }

  return (
    <div className={styles.canvas}>
      {componentsList.map(item => {
        const { fe_id } = item

        const wrapperClass = styles['component-wrapper']
        const selectedClass = styles['selected']
        const classObj = classNames({
          [wrapperClass]: true,
          [selectedClass]: selectedId === fe_id,
        })

        return (
          <div className={classObj} key={fe_id} onClick={e => handleClick(e, fe_id)}>
            <div className={styles.component}>{getComponent(item)}</div>
          </div>
        )
      })}
    </div>
  )
}

export default EditCanvas
