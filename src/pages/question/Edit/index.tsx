import React, { FC } from 'react'
import { useLoadQuestionData } from '../../../hooks/useLoadQuestionData'
import styles from './index.module.scss'
import EditCanvas from './EditCanvas'
import { useAppDispatch } from '@/store/types'
import { changeSelectedId } from '@/store/modules/componentsReducer'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import EditHeader from './EditHeader'
import { useGetPageInfo } from '@/hooks/useGetPageInfo'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo'
import { useTitle } from 'ahooks'

const Edit: FC = () => {
  const { loading } = useLoadQuestionData()
  const { title } = useGetPageInfo()
  const { previewMode } = useGetComponentInfo()
  useTitle(`闂嵎缂栬緫 - ${title}`)
  const dispatch = useAppDispatch()

  function handleClick() {
    if (previewMode) return
    dispatch(changeSelectedId(''))
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <EditHeader></EditHeader>
      </div>
      <div className={`${styles.main} ${previewMode ? styles.preview : ''}`}>
        {!previewMode && (
          <div className={styles.left}>
            <LeftPanel />
          </div>
        )}
        <div className={styles.center} onClick={() => handleClick()}>
          <div className={styles['canvas-content']}>
            <EditCanvas loading={loading}></EditCanvas>
          </div>
        </div>
        {!previewMode && (
          <div className={styles.right}>
            <RightPanel />
          </div>
        )}
      </div>
    </div>
  )
}

export default Edit
