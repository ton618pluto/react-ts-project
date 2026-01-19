import React, { FC } from 'react'
import { useLoadQuestionData } from '../../../hooks/useLoadQuestionData'
import styles from './index.module.scss'
import EditCanvas from './EditCanvas'
import { useAppDispatch } from '@/store/types'
import { changeSelectedId } from '@/store/modules/componentsReducer'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import EditHeader from './EditHeader'

const Edit: FC = () => {
  const { loading } = useLoadQuestionData()
  const dispatch = useAppDispatch()

  function handleClick() {
    dispatch(changeSelectedId(''))
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <EditHeader></EditHeader>
      </div>
      <div className={styles.main}>
        <div className={styles.left}>
          <LeftPanel />
        </div>
        <div className={styles.center} onClick={() => handleClick()}>
          <div className={styles['canvas-content']}>
            <EditCanvas loading={loading}></EditCanvas>
          </div>
        </div>
        <div className={styles.right}>
          <RightPanel />
        </div>
      </div>
    </div>
  )
}

export default Edit
