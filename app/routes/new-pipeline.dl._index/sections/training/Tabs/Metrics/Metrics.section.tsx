import React from "react";
import type { UseFormReturn } from "react-hook-form";
import type { PipelineDL, PreTrainedModels } from "~/types/pipelineDL";
import { cn } from "~/utils/general";
import { MetricsListField } from "./MetricsList.field";
import { MetricsSelectField } from "./MetricsSelect.field";


type MetricsSectionProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

/**
 * Here only one model needs to be selected and below it will be a cnotainer to chagne its props.
 */
export function MetricsSection({ form, className, ...delegated}: MetricsSectionProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-8",
        "mb-11",
        className
      )}
      {...delegated}
    >
      <MetricsSelectField 
        form={form}
        className="w-[100%]"
      />
      <MetricsListField
        form={form}
        className="w-[100%]"
      />
    </div>
  )
}