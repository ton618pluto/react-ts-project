// 单个问卷的类型解构
import { FC } from 'react'

// Question模块中各个组件的props的结构
export type QuestionInputPropsType = {
  text?: string
  placeholder?: string
  isLocked?: boolean
  onChange?: (props: QuestionInputPropsType) => void
}

export type QuestionTextareaPropsType = {
  text?: string
  placeholder?: string
  isLocked?: boolean
  onChange?: (props: QuestionTextareaPropsType) => void
}

export type QuestionTitlePropsType = {
  text?: string
  level?: 1 | 2 | 3
  isCenter?: boolean
  isLocked?: boolean
  onChange?: (props: QuestionTitlePropsType) => void
}

export type QuestionPragraphPropsType = {
  text?: string
  isCenter?: boolean
  isLocked?: boolean
  onChange?: (props: QuestionPragraphPropsType) => void
}

export type QuestionInfoPropsType = {
  text?: string
  desc?: string
  isLocked?: boolean
  onChange?: (props: QuestionInfoPropsType) => void
}

export type OptionType = {
  value: string
  text: string
}

export type QuestionRadioPropsType = {
  title?: string
  isVertical?: boolean
  value?: string
  options?: OptionType[]
  isLocked?: boolean
  onChange?: (props: QuestionRadioPropsType) => void
}

export type CheckboxOptionType = {
  value: string
  text: string
  checked: boolean
}

export type QuestionCheckboxPropsType = {
  title?: string
  isVertical?: boolean
  list?: CheckboxOptionType[]

  // 用于 PropComponent
  onChange?: (newProps: QuestionCheckboxPropsType) => void
  isLocked?: boolean
}

// 问卷中组件的Props的类型
export type ComponentPropsType =
  | QuestionInputPropsType
  | QuestionTextareaPropsType
  | QuestionTitlePropsType
  | QuestionPragraphPropsType
  | QuestionInfoPropsType
  | QuestionRadioPropsType
  | QuestionCheckboxPropsType

// 后端返回的单个组件的数据格式
export type ComponentInfoType = {
  fe_id: string
  title: string
  type: string
  isHidden: boolean
  isLocked: boolean
  props: ComponentPropsType
}

// 后端返回的单个问卷的数据格式
export type ComponentsListType = ComponentInfoType[]
export type SingleQuestionType = {
  id: string
  title: string
  desc: string
  js: string
  css: string
  isPublished: boolean
  componentsList: ComponentsListType
}

// 统计组件的属性类型
export type StatType = {
  name: string
  count: number
}
export type QuestionRadioStatPropsType = {
  stat: Array<StatType>
}

export type QuestionCheckboxStatPropsType = {
  stat: Array<StatType>
}

export type QuestionStatPropsType = QuestionRadioStatPropsType | QuestionCheckboxStatPropsType

// 问卷组件的类型上下文表示
export type ComponentConfType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  PropComponent: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
  StatComponent?: FC<QuestionStatPropsType>
}
