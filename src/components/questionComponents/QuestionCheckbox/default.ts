import { QuestionCheckboxPropsType, ComponentConfType } from '@/types/questionTypes'
import QuestionCheckbox from './index'
import CheckboxPropComponent from './CheckboxPropComponent'
import CheckboxStatComponent from './CheckboxStatComponent'

export const QuestionCheckboxDefaultProps: QuestionCheckboxPropsType = {
  title: '多选题标题',
  isVertical: false,
  list: [
    { value: 'item1', text: '选项1', checked: false },
    { value: 'item2', text: '选项2', checked: false },
    { value: 'item3', text: '选项3', checked: false },
  ],
}

const QuestionCheckboxConf: ComponentConfType = {
  title: '多选框',
  type: 'questionCheckbox',
  Component: QuestionCheckbox,
  PropComponent: CheckboxPropComponent,
  defaultProps: QuestionCheckboxDefaultProps,
  StatComponent: CheckboxStatComponent,
}

export default QuestionCheckboxConf
