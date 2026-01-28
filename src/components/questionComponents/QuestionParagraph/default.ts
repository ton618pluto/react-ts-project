import Component from './index'
import { QuestionPragraphPropsType, ComponentConfType } from '@/types/questionTypes'
import ParagraphPropComponent from './ParagraphPropComponent'

export const QuestionParagraphDefault: QuestionPragraphPropsType = {
  text: '这是一个段落',
  isCenter: false,
}

// Title组件的配置
const QuestionParagraphConf: ComponentConfType = {
  text: '段落',
  type: 'questionParagraph',
  Component: Component,
  PropComponent: ParagraphPropComponent,
  defaultProps: QuestionParagraphDefault,
}

export default QuestionParagraphConf
