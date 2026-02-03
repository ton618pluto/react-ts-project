import { useAppSelector } from '@/store/types'

export const useGetPageInfo = () => {
  const pageInfo = useAppSelector(state => state.pageInfo)

  return pageInfo
}
