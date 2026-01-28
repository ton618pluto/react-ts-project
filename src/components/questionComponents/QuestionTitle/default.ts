import Component from './index'
import { QuestionTitlePropsType, ComponentConfType } from '@/types/questionTypes'
import TitlePropComponent from './TitlePropComponent'

export const QuestionTitleDefault: QuestionTitlePropsType = {
  text: '这是一个问卷标题',
  level: 1,
  isCenter: false,
}

// Title组件的配置
const QuestionTitleConf: ComponentConfType = {
  text: '标题',
  type: 'questionTitle',
  Component: Component,
  PropComponent: TitlePropComponent,
  defaultProps: QuestionTitleDefault,
}
export default QuestionTitleConf
