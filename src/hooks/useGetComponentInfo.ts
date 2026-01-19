import { useAppSelector } from '@/store/types'

export function useGetComponentInfo() {
  const { componentsList = [], selectedId } = useAppSelector(state => state.components)
  const selectedComponent = componentsList.find(item => item.fe_id === selectedId)

  return {
    componentsList,
    selectedComponent,
    selectedId,
  }
}
