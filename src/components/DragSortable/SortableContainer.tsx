import React, { FC, JSX } from 'react'
import {
  DndContext,
  closestCenter,
  MouseSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
// import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

type PropsType = {
  children: JSX.Element | JSX.Element[]
  items: Array<{ id: string; [key: string]: any }>
  onDragEnd: (oldIndex: number, newIndex: number) => void
}

const SortableContainer: FC<PropsType> = (props: PropsType) => {
  const { children, items, onDragEnd } = props

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8, // 8px
      },
    })
  )

  // 拖拽结束时触发
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over === null) return

    // 通过id拿到拖拽元素的新旧位置，active为正在拖拽的元素，over为拖拽结束时所在的位置
    if (active.id !== over.id) {
      // const oldIndex = items.indexOf(active.id.toString());
      const oldIndex = items.findIndex(item => item.fe_id === active.id)
      // const newIndex = items.indexOf(over.id.toString());
      const newIndex = items.findIndex(item => item.fe_id === over.id)

      // 传入新旧位置，准备交换
      onDragEnd(oldIndex, newIndex)
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  )
}

export default SortableContainer
