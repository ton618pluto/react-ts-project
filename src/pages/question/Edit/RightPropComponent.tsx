import { getComponentConfByType } from '@/components/questionComponents'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo'
import { changeComponentProp } from '@/store/modules/componentsReducer'
import { useAppDispatch } from '@/store/types'
import { ComponentPropsType } from '@/types/questionTypes'
import React, { FC } from 'react'

type NoProps = {
  msg: string
}
const NoProp: FC<NoProps> = (props: NoProps) => {
  return <div style={{ textAlign: 'center' }}>{props.msg}</div>
}

const RightPropComponent: FC = () => {
  const { selectedComponent, selectedId } = useGetComponentInfo()
  const dispatch = useAppDispatch()

  if (!selectedComponent) return <NoProp msg="没有选中画布中的一个组件"></NoProp>
  const { type, props, isLocked, isHidden } = selectedComponent
  const componentConf = getComponentConfByType(type)
  if (!componentConf) return <NoProp msg="没有找到画布中组件的上下文信息"></NoProp>
  const { PropComponent } = componentConf

  function handlePropsChange(newProps: ComponentPropsType) {
    if (!selectedComponent) return <NoProp msg="没有选中画布中的一个组件"></NoProp>

    dispatch(changeComponentProp({ fe_id: selectedId, newProps }))
  }

  return (
    <PropComponent
      {...props}
      onChange={handlePropsChange}
      isLocked={isLocked || isHidden}
    ></PropComponent>
  )
}

export default RightPropComponent
