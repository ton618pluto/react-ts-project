import { useDispatch, useSelector } from 'react-redux'
import { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './index'

// 在整个应用中使用这两个增加类型的钩子，而不是原生的
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
