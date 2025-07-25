import React from "react";
import { useFieldArray, type UseFormReturn } from "react-hook-form";
import type { PipelineDL } from "~/types/pipelineDL";
import { cn } from "~/utils/general";
import { CustomModelsAdd } from "./CustomModelsAdd.section";
import { CustomModelsReorder } from "./CustomModelsReorder.section";

type CustomModelsSectionProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function CustomModelsSection({ form, className, ...delegated}: CustomModelsSectionProps) {
  const fieldArrayOptions = useFieldArray({
    control: form.control,
    name: 'customModels'
  })

  return (
    <div
      aria-description=""
      className={cn(
        className
      )}
      {...delegated}
    >
      <div
        className={cn(
          "flex flex-col gap-8",
          "mb-11",
          'sm:flex-row',
        )}
      >
        <CustomModelsAdd 
          form={form}
          fieldArrayOptions={fieldArrayOptions}
          className={cn(
            'sm:basis-[36%]',
          )}
        />
        <CustomModelsReorder 
          form={form}
          fieldArrayOptions={fieldArrayOptions}
          className={cn(
            'sm:flex-grow'
          )}
        />
      </div>
    </div>
  )
}