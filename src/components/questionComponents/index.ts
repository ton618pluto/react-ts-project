import QuestionTitleConf from './QuestionTitle/default'
import QuestionInputConf from './QuestionInput/default'
import QuestionParagraphConf from './QuestionParagraph/default'
import QuestionInfoConf from './QuestionInfo/default'
import QuestionTextareaConf from './QuestionTextarea/default'
import QutstionRadioConf from './QuestionRadio/default'
import QuestionCheckboxConf from './QuestionCheckbox/default'
import { ComponentConfType } from '@/types/questionTypes'

// 获取组件的分组（用于左边看板的组件库显示）
export const componentConfGroup = [
  {
    groupId: 'textGroup',
    groupName: '文本显示',
    components: [QuestionTitleConf, QuestionParagraphConf, QuestionInfoConf],
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    components: [QuestionInputConf, QuestionTextareaConf],
  },
  {
    groupId: 'selectGroup',
    groupName: '用户选择',
    components: [QutstionRadioConf, QuestionCheckboxConf],
  },
]

// 所有组件的上下文配置数组
const componentConfList: ComponentConfType[] = [
  QuestionTitleConf,
  QuestionParagraphConf,
  QuestionInfoConf,
  QuestionInputConf,
  QuestionTextareaConf,
  QutstionRadioConf,
  QuestionCheckboxConf,
]

// 根据type获取组件的上下文配置
export const getComponentConfByType = (type: string) => {
  return componentConfList.find(item => item.type === type)
}
