import { useAppSelector } from '@/store/types'

export function useGetComponentInfo() {
  const components = useAppSelector(state => state.components)

  return components
}
