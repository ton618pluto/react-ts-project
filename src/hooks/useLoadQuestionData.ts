// useLoadQuestionData.ts
// import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getQuestionService } from '../services/question'
import { useRequest } from 'ahooks'
import { useAppDispatch } from '@/store/types'
import { useEffect } from 'react'
import { resetComponents } from '@/store/modules/componentsReducer'
import { resetPageInfo } from '@/store/modules/pageInfoReducer'
import { ActionCreators } from 'redux-undo'

// 加载问卷数据
export function useLoadQuestionData() {
  const { id = '' } = useParams()
  const dispatch = useAppDispatch()

  const { loading, run, data, error } = useRequest(
    async () => {
      const data = await getQuestionService(id)

      return data
    },
    {
      manual: true,
    }
  )

  useEffect(() => {
    if (!data) return
    const { componentsList, title, desc, js, css } = data

    const selectedId = ''
    // if (componentsList.length) {
    //   selectedId = componentsList[0].fe_id
    // }

    // 设置页面相关信息
    dispatch(resetPageInfo({ title, desc, js, css }))

    // 设置组件信息
    dispatch(resetComponents({ componentsList, selectedId, copiedComponent: null }))
    dispatch(ActionCreators.clearHistory()) // 最好是清空它
  }, [data])

  useEffect(() => {
    run()
  }, [id])

  return {
    loading,
    error,
  }
}
