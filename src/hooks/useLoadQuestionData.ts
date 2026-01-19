// useLoadQuestionData.ts
// import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getQuestionService } from '../services/question'
import { useRequest } from 'ahooks'
import { useAppDispatch } from '@/store/types'
import { useEffect } from 'react'
import { resetComponents } from '@/store/modules/componentsReducer'

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
    const { componentsList } = data

    let selectedId = ''
    if (componentsList.length) {
      selectedId = componentsList[0].fe_id
    }
    dispatch(resetComponents({ componentsList, selectedId }))
  }, [data])

  useEffect(() => {
    run()
  }, [id])

  return {
    loading,
    error,
  }
}
