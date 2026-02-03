import Component from './index'
// props的结构
import { QuestionTextareaPropsType, ComponentConfType } from '@/types/questionTypes'
import TextareaPropComponent from './TextareaPropComponent'

// props的默认值
export const QuestionTextareaDefault: QuestionTextareaPropsType = {
  text: '多行输入框标题',
  placeholder: '请输入...',
}

// Input组件的配置
const QuestionTextareaConf: ComponentConfType = {
  title: '多行文本输入框',
  type: 'questionTextarea',
  Component: Component,
  PropComponent: TextareaPropComponent,
  defaultProps: QuestionTextareaDefault,
}
export default QuestionTextareaConf
