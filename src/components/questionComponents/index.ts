import QuestionTitleConf from './QuestionTitle/default'
import QuestionInputConf from './QuestionInput/default'
import { ComponentConfType } from '@/types/questionTypes'

// 所有组件的上下文配置数组
const componentConfList: ComponentConfType[] = [QuestionTitleConf, QuestionInputConf]

// 根据type获取组件的上下文配置
export const getComponentConfByType = (type: string) => {
  return componentConfList.find(item => item.type === type)
}
