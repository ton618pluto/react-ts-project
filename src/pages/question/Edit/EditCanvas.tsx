import React, { FC, MouseEvent, useMemo, useState } from 'react'
import { Spin, message } from 'antd'
import SortableContainer from '@/components/DragSortable/SortableContainer'
import SortableItem from '@/components/DragSortable/SortableItem'
import styles from './EditCanvas.module.scss'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo'
import { ComponentInfoType, QuestionRadioPropsType } from '@/types/questionTypes'
import { getComponentConfByType } from '@/components/questionComponents'
import { useAppDispatch } from '@/store/types'
import {
  changeSelectedId,
  moveComponentPosition,
  togglePreviewMode,
} from '@/store/modules/componentsReducer'
import classNames from 'classnames'
import { useBindCanvasKeyPress } from '@/hooks/useBindCanvasKeyPress'

type PropsType = {
  loading: boolean
}

function getComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo
  const componentConf = getComponentConfByType(type)

  if (!componentConf) return
  const { Component } = componentConf

  return <Component {...props}></Component>
}

// 预览画布，处理跳题逻辑 - 显示所有非跳过题目
function PreviewCanvas({ componentsList }: { componentsList: ComponentInfoType[] }) {
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>({})

  if (componentsList.length === 0) {
    return <div style={{ textAlign: 'center', color: 'var(--color-text-secondary)' }}>暂无题目</div>
  }

  // 根据已选择的值计算哪些组件需要显示
  const visibleComponents = useMemo(() => {
    const result: ComponentInfoType[] = []

    for (let i = 0; i < componentsList.length; i++) {
      const comp = componentsList[i]
      const { type, props: componentProps, fe_id } = comp
      const compConf = getComponentConfByType(type)
      if (!compConf) continue

      const { defaultProps } = compConf
      const mergedProps = { ...defaultProps, ...componentProps }

      // 如果是单选题且有选择值，查 jumpTo
      if (type === 'questionRadio') {
        const jumpTo = (mergedProps as QuestionRadioPropsType).jumpTo
        const selectedValue = selectedValues[fe_id]

        if (jumpTo && selectedValue && jumpTo[selectedValue]) {
          const targetFeId = jumpTo[selectedValue]
          const targetIndex = componentsList.findIndex(c => c.fe_id === targetFeId)
          if (targetIndex > i) {
            result.push(comp)
            i = targetIndex - 1
            continue
          }
        }
      }

      result.push(comp)
    }

    return result
  }, [componentsList, selectedValues])

  function handleOptionChange(componentFeId: string, value: string) {
    setSelectedValues(prev => ({ ...prev, [componentFeId]: value }))
  }

  return (
    <div className={styles.canvas}>
      {visibleComponents.map(item => {
        const { fe_id, props: componentProps, type } = item
        const compConf = getComponentConfByType(type)
        if (!compConf) return null

        const { Component, defaultProps } = compConf
        const mergedProps = { ...defaultProps, ...componentProps }

        // 如果是单选题，处理 onChange
        if (type === 'questionRadio') {
          const radioProps = mergedProps as QuestionRadioPropsType
          const curValue = selectedValues[fe_id] || radioProps.value
          const jumpToProps = {
            ...mergedProps,
            value: curValue,
            onChange: (newProps: QuestionRadioPropsType) => {
              if (newProps.value) {
                handleOptionChange(fe_id, newProps.value)
              }
            },
          }
          return (
            <div key={fe_id} className={styles['component-wrapper']}>
              <div className={styles.component}>
                <Component {...jumpToProps} />
              </div>
            </div>
          )
        }

        return (
          <div key={fe_id} className={styles['component-wrapper']}>
            <div className={styles.component}>
              <Component {...mergedProps} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

const EditCanvas: FC<PropsType> = (props: PropsType) => {
  const { componentsList, selectedId, previewMode } = useGetComponentInfo()
  const dispatch = useAppDispatch()

  // 绑定快捷键
  useBindCanvasKeyPress()

  function handleClick(e: MouseEvent, id: string) {
    e.stopPropagation()
    dispatch(changeSelectedId(id))
  }

  function handleDragEnd(oldIndex: number, newIndex: number) {
    dispatch(moveComponentPosition({ oldIndex, newIndex }))
  }

  const componentsListWithId = useMemo(() => {
    return componentsList.map(comp => {
      return {
        id: comp.fe_id,
        ...comp,
      }
    })
  }, [componentsList])

  // 预览模式
  if (previewMode) {
    return (
      <div className={`${styles.canvas} ${styles['preview-mode']}`}>
        <div className={styles['preview-banner']}>
          <span>您正在预览问卷</span>
          <span className={styles['exit-btn']} onClick={() => dispatch(togglePreviewMode())}>
            点击退出预览
          </span>
        </div>
        <PreviewCanvas componentsList={componentsList}></PreviewCanvas>
      </div>
    )
  }

  return props.loading ? (
    <div style={{ textAlign: 'center' }}>
      <Spin size="large" tip="加载中...">
        <div style={{ padding: 50, borderRadius: 4 }} />
      </Spin>
    </div>
  ) : (
    <SortableContainer items={componentsListWithId} onDragEnd={handleDragEnd}>
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
              <SortableItem key={fe_id} id={fe_id}>
                <div className={classObj} onClick={e => handleClick(e, fe_id)}>
                  <div className={styles.component}>{getComponent(item)}</div>
                </div>
              </SortableItem>
            )
          })}
      </div>
    </SortableContainer>
  )
}

export default EditCanvas
