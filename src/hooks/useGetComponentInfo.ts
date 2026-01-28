import { useAppSelector } from '@/store/types'

// 获取store中关于question的状态
export function useGetComponentInfo() {
  const {
    componentsList = [],
    selectedId,
    copiedComponent,
  } = useAppSelector(state => state.components)
  const selectedComponent = componentsList.find(item => item.fe_id === selectedId)

  return {
    componentsList,
    selectedComponent,
    selectedId,
    copiedComponent,
  }
}
