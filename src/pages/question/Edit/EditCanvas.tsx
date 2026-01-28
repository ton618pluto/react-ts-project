import React, { FC, MouseEvent } from 'react'
import { Spin } from 'antd'
import styles from './EditCanvas.module.scss'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo'
import { ComponentInfoType } from '@/types/questionTypes'
import { getComponentConfByType } from '@/components/questionComponents'
import { useAppDispatch } from '@/store/types'
import { changeSelectedId } from '@/store/modules/componentsReducer'
import classNames from 'classnames'
import { useBindCanvasKeyPress } from '@/hooks/useBindCanvasKeyPress'

type PropsType = {
  loading: boolean
}

function getComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo
  // 根据type获取对应的函数组件
  const componentConf = getComponentConfByType(type)
  // console.log('componentConf?.defaultProps', componentConf?.defaultProps)

  if (!componentConf) return
  const { Component } = componentConf

  return <Component {...props}></Component>
}

const EditCanvas: FC<PropsType> = (props: PropsType) => {
  // useEffect(() => {
  //   console.log(123456)

  //   const handler = (e: KeyboardEvent) => {
  //     if (e.key === 'Backspace' || e.key === 'Delete') {
  //       console.log('原生监听 123', e.type)
  //     }
  //   }
  //   window.addEventListener('keydown', handler)
  //   return () => {
  //     console.log('卸载')

  //     window.removeEventListener('keydown', handler)
  //   }
  // }, [])

  const { componentsList, selectedId } = useGetComponentInfo()
  const dispatch = useAppDispatch()

  useBindCanvasKeyPress()

  function handleClick(e: MouseEvent, id: string) {
    e.stopPropagation()
    dispatch(changeSelectedId(id))
  }

  return props.loading ? (
    <div style={{ textAlign: 'center' }}>
      <Spin size="large" tip="加载中...">
        <div style={{ padding: 50, borderRadius: 4 }} />
      </Spin>
    </div>
  ) : (
    <div className={styles.canvas}>
      {componentsList
        .filter(component => !component.isHidden)
        .map(item => {
          const { fe_id, isLocked } = item

          const wrapperClass = styles['component-wrapper']
          const selectedClass = styles['selected']
          const lockClass = styles['locked']
          const classObj = classNames({
            [wrapperClass]: true,
            [selectedClass]: selectedId === fe_id,
            [lockClass]: isLocked,
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
