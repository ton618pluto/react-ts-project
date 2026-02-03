import { useAppSelector } from '@/store/types'

// 获取store中关于question的状态
export function useGetComponentInfo() {
  // 没有undo的写法
  // const {
  //   componentsList = [],
  //   selectedId,
  //   copiedComponent,
  // } = useAppSelector(state => state.components)

  // 用了undo的写法
  const {
    componentsList = [],
    selectedId,
    copiedComponent,
  } = useAppSelector(state => state.components.present)

  const selectedComponent = componentsList.find(item => item.fe_id === selectedId)
  const visibleComponnents = componentsList.filter(item => !item.isHidden)

  return {
    componentsList,
    selectedComponent,
    selectedId,
    copiedComponent,
    visibleComponnents,
  }
}
