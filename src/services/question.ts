import instance from './ajax'
import { AnyObjType } from './ajax'

import { SingleQuestionType } from '@/types/questionTypes'

// 获取当个问卷信息

export async function getQuestionService(id: string): Promise<SingleQuestionType> {
  const url = `/api/question/${id}`
  const data = await instance.get<SingleQuestionType>(url)
  return data
}

// 创建问卷
type QuestionCreateType = {
  id: string
}

export async function createQuestionService() {
  const data = await instance.post<QuestionCreateType>('/api/question')
  return data
}

// 获取问卷列表
export type QuestionType = {
  _id: string
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createdAt: string
  isDeleted: boolean
}

export type QuestionListType = {
  list: QuestionType[]
  total: number
}

export type SearchOpt = {
  keyword: string
  isStar: boolean
  isDeleted: boolean
  page: number
  pageSize: number
}

export async function getQuestionListService(opt: Partial<SearchOpt>) {
  const data = await instance.get<QuestionListType>('/api/question', opt)
  return data
}

// 更新问卷

export async function updateQuestionService(id: string, opt: AnyObjType) {
  const data = await instance.patch<AnyObjType>(`/api/question/${id}`, opt)
  return data
}

// 复制问卷
export async function duplicateQuestionService(id: string) {
  const data = await instance.post<QuestionCreateType>(`/api/question/duplicate/${id}`)
  return data
}

// 删除问卷
export async function deleteQuestionService(ids: string[]) {
  const data = await instance.delete<AnyObjType>(`/api/question`, { ids })
  return data
}
