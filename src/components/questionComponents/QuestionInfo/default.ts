import { QuestionInfoPropsType, ComponentConfType } from '@/types/questionTypes'
import Component from './index'
import InfoPropComponent from './InfoPropComponent'

// props的默认值
export const QuestionInfoDefault: QuestionInfoPropsType = {
  text: '问卷标题',
  desc: '问卷描述',
  //   disabled: false,
}

// Input组件的配置
const QuestionInfoConf: ComponentConfType = {
  title: '',
  type: 'questionInfo',
  Component: Component,
  PropComponent: InfoPropComponent,
  defaultProps: QuestionInfoDefault,
}

export default QuestionInfoConf
