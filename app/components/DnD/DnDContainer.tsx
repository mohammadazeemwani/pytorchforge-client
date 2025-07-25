import React from "react";
import { cn } from "~/utils/general";
import {closestCenter, DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors, type DragEndEvent} from '@dnd-kit/core';
import {arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy} from '@dnd-kit/sortable';


export type DnDContainerProps = {
  items: string[],
  /** This is the callback that will be called with newItemsArray */
  onUpdate?: (newItemsArray: string[]) => void,
  move?: (from: number, to: number) => void,
  children: React.ReactNode
} & React.ComponentProps<'div'>

/** List of DnDItem shouild strictly be directly rendered inside it */
export function DnDContainer({ className, items, onUpdate, move, children, ...delegated}: DnDContainerProps) {
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates})
  )

  const onDragEnd = React.useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = items.indexOf(`${active.id}`);
      const newIndex = items.indexOf(`${over?.id}`);

      const newItems = arrayMove(items, oldIndex, newIndex);
      onUpdate?.(newItems)
      move?.(oldIndex, newIndex)
    }
  }, [items])
  
  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
      sensors={sensors}
    >
    <SortableContext 
      items={items}
      strategy={verticalListSortingStrategy}
    >
    <div
      aria-description=""
      className={cn(
        'prose dark:prose-invert',
        'bg-base-200 border border-base-300 rounded-box flex flex-col',
        className
      )}
      {...delegated}
    >
      {children}
    </div>
    </SortableContext>
    </DndContext>
  )
}