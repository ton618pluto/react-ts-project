import Component from './index'
// props的结构
import { QuestionInputPropsType, ComponentConfType } from '@/types/questionTypes'
import InputPropComponent from './InputPropComponent'

// props的默认值
export const QuestionInputDefault: QuestionInputPropsType = {
  text: '输入框标题',
  placeholder: '请输入...',
}

// Input组件的配置
const QuestionInputConf: ComponentConfType = {
  text: '输入框',
  type: 'questionInput',
  Component: Component,
  PropComponent: InputPropComponent,
  defaultProps: QuestionInputDefault,
}
export default QuestionInputConf
