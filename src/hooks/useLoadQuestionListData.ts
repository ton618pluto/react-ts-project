import { useRequest } from 'ahooks'
import { useSearchParams } from 'react-router-dom'
import {
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE,
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_SEARCH_PARAM_KEY,
} from '../constants'
import { getQuestionListService } from '../services/question'

type OptionType = {
  isStar: boolean
  isDeleted: boolean
  page: number
  pageSize: number
}

export function useLoadQuestionListData(opt: Partial<OptionType> = {}) {
  const { isStar, isDeleted } = opt
  const [searchParams] = useSearchParams()

  async function getQuestionList() {
    const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
    const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE
    const data = await getQuestionListService({ keyword, isStar, isDeleted, page, pageSize })
    return data
  }

  const { data, loading, error, refresh } = useRequest(getQuestionList, {
    // 当searchParams变化时，重新执行getQuestionList
    refreshDeps: [searchParams],
  })

  return {
    data,
    loading,
    error,
    refresh,
  }
}
