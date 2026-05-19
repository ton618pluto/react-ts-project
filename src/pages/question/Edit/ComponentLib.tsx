import React, { FC, useCallback } from 'react'
import { componentConfGroup } from '@/components/questionComponents'
import { Typography } from 'antd'
import { ComponentConfType } from '@/types/questionTypes'
import styles from './ComponentLib.module.scss'
import { nanoid } from 'nanoid'
import { useAppDispatch } from '@/store/types'
import { addComponent } from '@/store/modules/componentsReducer'
const { Title } = Typography

const ComponentLib: FC = () => {
  function getComponent(componentConf: ComponentConfType) {
    const { title, type, Component, defaultProps } = componentConf
    const dispatch = useAppDispatch()
    const handleAddClick = useCallback(() => {
      dispatch(
        addComponent({
          fe_id: nanoid(),
          title,
          type,
          isHidden: false,
          isLocked: false,
          props: defaultProps,
        })
      )
    }, [])

    return (
      <div className={styles['wrapper']} key={type} onClick={handleAddClick}>
        <div className={styles['component']}>
          <Component {...defaultProps} />
        </div>
      </div>
    )
  }
  return (
    <>
      {componentConfGroup.map((group, idx) => {
        const { groupId, groupName, components } = group

        return (
          <div key={groupId}>
            <Title level={3} style={{ fontSize: '16px', marginTop: idx > 0 ? '20px' : 0 }}>
              {groupName}
            </Title>
            <div>{components.map(component => getComponent(component))}</div>
          </div>
        )
      })}
    </>
  )
}

export default ComponentLib
