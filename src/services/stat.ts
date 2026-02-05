import instance from './ajax'
import { QuestionRadioStatPropsType } from '@/types/questionTypes'

// 获取问卷的统计列表
export type StatListType = {
  total: number
  list: ListType
}

export type ListType = Array<{ _id: string }>
export const getQuestionStatListService = async (
  questionId: string,
  opt: { page: number; pageSize: number }
): Promise<StatListType> => {
  const url = `/api/stat/${questionId}`
  const data = await instance.get<StatListType>(url, opt)
  return data
}

// 获取组件的统计数据汇总

export const getComponentStatService = async (
  questionId: string,
  componentId: string
): Promise<QuestionRadioStatPropsType> => {
  const url = `/api/stat/${questionId}/${componentId}`
  const data = await instance.get<QuestionRadioStatPropsType>(url)
  return data
}
