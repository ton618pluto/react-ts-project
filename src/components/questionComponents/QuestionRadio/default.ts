import { QuestionRadioPropsType, ComponentConfType } from '@/types/questionTypes'
import QutstionRadio from './index'
import RadioPropComponent from './RadioPropComponent'

export const QuestionRadioDefaultProps: QuestionRadioPropsType = {
  title: '单选标题',
  isVertical: false,
  value: '',
  options: [
    { value: 'item1', text: '选项1' },
    { value: 'item2', text: '选项2' },
    { value: 'item3', text: '选项3' },
  ],
}

const QutstionRadioConf: ComponentConfType = {
  text: '单选框',
  type: 'questionRadio',
  Component: QutstionRadio,
  PropComponent: RadioPropComponent,
  defaultProps: QuestionRadioDefaultProps,
}

export default QutstionRadioConf
