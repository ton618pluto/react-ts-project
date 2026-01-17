// useLoadQuestionData.ts
// import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getQuestionService } from '../services/question'
import { useRequest } from 'ahooks'

// 加载问卷数据
export function useLoadQuestionData() {
  const { id = '' } = useParams()
  //   const [loading, setLoading] = useState(true)
  //   const [questionData, setQuestionData] = useState({})

  //   useEffect(() => {
  //     async function fn() {
  //       try {
  //         const data = await getQuestionService(id)
  //         setQuestionData(data)
  //         setLoading(false)
  //         console.log('res', data)
  //       } catch (error: any) {
  //         console.log(new Error(error))
  //       }
  //     }

  //     fn()
  //   }, [])
  async function load() {
    const data = await getQuestionService(id)
    return data
  }

  const { data, error, loading } = useRequest(load)

  return {
    loading,
    data,
    error,
  }
}
