import React, { FC, useState, ChangeEvent, useMemo } from 'react'
import classNames from 'classnames'
import { message, Input, Button, Space } from 'antd'
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import SortableContainer from '@/components/DragSortable/SortableContainer'
import SortableItem from '@/components/DragSortable/SortableItem'
import { useAppDispatch } from '@/store/types'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo'
import {
  changeSelectedId,
  changeComponentTitle,
  changeComponentHidden,
  changeComponentLock,
  moveComponentPosition,
} from '@/store/modules/componentsReducer'
import styles from './Layers.module.scss'

const Layers: FC = () => {
  const { componentsList, selectedId } = useGetComponentInfo()
  const dispatch = useAppDispatch()

  // 记录当前正在修改标题的组件
  const [changingTitleId, setChangingTitleId] = useState('')

  // 点击选中组件
  function handleTitleClick(fe_id: string) {
    const curComp = componentsList.find(c => c.fe_id === fe_id)
    if (curComp && curComp.isHidden) {
      message.info('不能选中隐藏的组件')
      return
    }
    if (fe_id !== selectedId) {
      // 当前组件未被选中，执行选中
      dispatch(changeSelectedId(fe_id))
      setChangingTitleId('')
    } else {
      // 点击修改标题
      setChangingTitleId(fe_id)
    }
  }

  // 修改标题
  function changeTitle(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim()
    if (!newTitle) return
    if (!selectedId) return
    dispatch(changeComponentTitle({ fe_id: selectedId, title: newTitle }))
  }

  //   切换 隐藏/显示
  function handleChangeHidden(fe_id: string, isHidden: boolean) {
    dispatch(changeComponentHidden({ fe_id, isHidden }))
  }
  // 切换 锁定/不锁定
  function handleChangeLocked(fe_id: string) {
    dispatch(changeComponentLock({ fe_id }))
  }

  const componentsListWithId = useMemo(() => {
    return componentsList.map(comp => {
      return {
        id: comp.fe_id,
        ...comp,
      }
    })
  }, [componentsList])

  function handleDragEnd(oldIndex: number, newIndex: number) {
    dispatch(moveComponentPosition({ oldIndex, newIndex }))
  }

  return (
    <SortableContainer items={componentsListWithId} onDragEnd={handleDragEnd}>
      {componentsList.map(c => {
        const { fe_id, title, isHidden, isLocked } = c

        // 拼接className
        const titleDefaultClassName = styles.title // 对应的类名
        const selectedClassName = styles.selected
        const titleClassName = classNames({
          [titleDefaultClassName]: true,
          [selectedClassName]: fe_id === selectedId,
        })

        return (
          <SortableItem key={fe_id} id={fe_id}>
            <div className={styles.wrapper}>
              <div className={titleClassName} onClick={() => handleTitleClick(fe_id)}>
                {fe_id === changingTitleId ? (
                  <Input
                    value={title}
                    onChange={changeTitle}
                    onPressEnter={() => setChangingTitleId('')}
                    onBlur={() => setChangingTitleId('')}
                  />
                ) : (
                  title
                )}
              </div>
              <div className={styles.handler}>
                <Space>
                  <Button
                    className={isHidden ? styles.btn : ''}
                    icon={<EyeInvisibleOutlined />}
                    type={isHidden ? 'primary' : 'text'}
                    shape="circle"
                    size="small"
                    onClick={() => handleChangeHidden(fe_id, !isHidden)}
                  />
                  <Button
                    className={isLocked ? styles.btn : ''}
                    icon={<LockOutlined />}
                    type={isLocked ? 'primary' : 'text'}
                    shape="circle"
                    size="small"
                    onClick={() => handleChangeLocked(fe_id)}
                  />
                </Space>
              </div>
            </div>
          </SortableItem>
        )
      })}
    </SortableContainer>
  )
}

export default Layers
