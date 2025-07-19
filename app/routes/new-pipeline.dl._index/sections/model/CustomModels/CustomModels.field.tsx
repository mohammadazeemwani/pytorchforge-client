import React from "react";
import type { UseFormReturn } from "react-hook-form";
import type { PipelineDL } from "~/types/pipelineDL";
import { cn } from "~/utils/general";
import { CustomModelsSelectField } from "./CustomModelsSelect.field";
import { CustomModelsReorder } from "./CustomModelsReorder.field";

type CustomModelFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function CustomModelField({ form, className, ...delegated}: CustomModelFieldProps) {
  return (
    <div
      aria-description=""
      className={cn(
        'prose dark:prose-invert',
        className
      )}
      {...delegated}
    >
      <div
        className={cn(
          "flex flex-col gap-8",
          "mb-11"
        )}
      >
        <CustomModelsSelectField 
          form={form}
          className="w-[100%]"
        />
        <CustomModelsReorder 
          form={form}
          className="w-[100%]"
        />
      </div>
    </div>
  )
}