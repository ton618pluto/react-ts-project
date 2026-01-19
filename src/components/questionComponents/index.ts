import QuestionTitleConf from './QuestionTitle/default'
import QuestionInputConf from './QuestionInput/default'
import { ComponentConfType } from '@/types/questionTypes'

// 所有组件的上下文配置数组
const componentConfList: ComponentConfType[] = [QuestionTitleConf, QuestionInputConf]

// 获取组件的分组
export const componentConfGroup = [
  {
    groupId: 'textGroup',
    groupName: '文本显示',
    components: [QuestionTitleConf],
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    components: [QuestionInputConf],
  },
]

// 根据type获取组件的上下文配置
export const getComponentConfByType = (type: string) => {
  return componentConfList.find(item => item.type === type)
}
