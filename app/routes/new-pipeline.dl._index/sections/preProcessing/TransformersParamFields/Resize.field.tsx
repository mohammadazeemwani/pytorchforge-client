import React from "react";
import { cn } from "~/utils/general";

type ResizeFieldProps = {} & React.ComponentProps<'div'>

export function ResizeField({ className, ...delegated}: ResizeFieldProps) {
  return (
    <div
      aria-description=""
      className={cn(
        'prose dark:prose-invert',
        className
      )}
      {...delegated}
    >
      
    </div>
  )
}