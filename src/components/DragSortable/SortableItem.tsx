// SortableItem.tsx
import React, { FC, JSX } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type ItemProps = {
  id: string
  children: JSX.Element
}

const SortableItem: FC<ItemProps> = (props: ItemProps) => {
  const { children, id } = props
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  )
}

export default SortableItem
