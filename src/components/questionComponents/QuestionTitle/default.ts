import Component from './index'
import { QuestionTitlePropsType } from '@/types/questionTypes'
import TitlePropComponent from './TitlePropComponent'

export const QuestionTitleDefault: QuestionTitlePropsType = {
  title: '这是一个问卷标题',
  level: 1,
  isCenter: false,
}

// Title组件的配置
export default {
  title: '标题',
  type: 'questionTitle',
  Component: Component,
  PropComponent: TitlePropComponent,
  defaultProps: QuestionTitleDefault,
}
