import React from "react";
import type { UseFormReturn } from "react-hook-form";
import type { PipelineDL } from "~/types/pipelineDL";
import { cn } from "~/utils/general";

type CustomModelFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function CustomModelField({ className, ...delegated}: CustomModelFieldProps) {
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