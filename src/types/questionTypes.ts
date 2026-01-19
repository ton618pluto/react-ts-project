// 单个问卷的类型解构
import { FC } from 'react'

// Question模块中各个组件的props的结构
export type QuestionInputPropsType = {
  title?: string
  placeholder?: string
  onChange?: (props: QuestionInputPropsType) => void
}

export type QuestionTitlePropsType = {
  title?: string
  level?: 1 | 2 | 3
  isCenter?: boolean
  onChange?: (props: QuestionTitlePropsType) => void
}

// 问卷中组件的Props的类型
export type ComponentPropsType = QuestionInputPropsType | QuestionTitlePropsType

// 后端返回的单个组件的数据格式
export type ComponentInfoType = {
  fe_id: string
  title: string
  type: string
  props: ComponentPropsType
}

// 后端返回的单个问卷的数据格式
export type ComponentsListType = ComponentInfoType[]
export type SingleQuestionType = {
  id: string
  title: string
  componentsList: ComponentsListType
}

// 问卷组件的类型上下文表示
export type ComponentConfType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  PropComponent: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}
