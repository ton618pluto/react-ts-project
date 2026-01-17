import Component from './index'
// props的结构
import { QuestionInputPropsType } from '@/types/questionTypes'

// props的默认值
export const QuestionInputDefault: QuestionInputPropsType = {
  title: '输入框标题',
  placeholder: '请输入...',
}

// Input组件的配置
export default {
  title: '输入框',
  type: 'questionInput',
  Component: Component,
  defaultProps: QuestionInputDefault,
}
