import React from "react";
import { cn } from "~/utils/general";
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { GripVertical, Cog } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "~/components/Dialog"

type DnDItemProps = 
& React.ComponentProps<'div'> 
& {
  id: string | number,
  children: React.ReactNode
  /** Children to render when gear icon is clicked */
  }
/**
 * - Renders the given children inside a div.
 * - Each div will have a drag handle on the left most side.
 * - And will have a gear icon on the rightmost side.
 * 
 * - Gear Icon will open up the editable form container of that particular item if there is any.
 * - It will not open a dialog box. It will open up the Some form just below The item
 */
export function DnDItem(props: DnDItemProps) {
  const {
    id,
    children,
    className, // from div props
    ...delegated
  } = props;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      style={style}
      ref={setNodeRef}
      aria-description=""
      className={cn(
        'prose dark:prose-invert',
        'bg-base-100 flex items-center',
        'border border-base-content/30 pl-1 sm:pl-[0.3rem] pr-2 py-1 rounded-field',
        className
      )}
      {...delegated}
    >
      <div  
        title="change order in list"
        className={cn(
          'touch-none select-none',
          isDragging ? 'cursor-grabbing' : 'cursor-grab',
          'px-[0.2rem] btn h-fit py-[0.15rem] rounded-selector'
        )}
        {...listeners} 
        {...attributes}
      >
        <GripVertical className="text-base-content w-[1.2rem]"/>
      </div>
      {children}
    </div>
  )
}