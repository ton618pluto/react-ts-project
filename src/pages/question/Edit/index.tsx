import React, { FC } from 'react'
import { useLoadQuestionData } from '../../../hooks/useLoadQuestionData'
import styles from './index.module.scss'
import EditCanvas from './EditCanvas'

const Edit: FC = () => {
  const { loading } = useLoadQuestionData()

  return (
    <div className={styles.container}>
      <div className={styles.header}>header</div>
      <div className={styles.main}>
        <div className={styles.left}>left</div>
        <div className={styles.center}>
          <div className={styles['canvas-content']}>
            <EditCanvas loading={loading}></EditCanvas>
          </div>
        </div>
        <div className={styles.right}>right</div>
      </div>
    </div>
  )
}

export default Edit
