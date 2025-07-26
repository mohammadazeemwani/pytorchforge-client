import React from "react"
import { cn } from "~/utils/general"
import type { MetricSectionProps } from "../../metric-param-section.mapper"
import { NumOutputsField } from "./NumOutputs.field"

export function MeanAbsoluteErrorSection({
  form,
  className,
  ...delegated
}: MetricSectionProps) {
  return (
    <div
      aria-description="form to change values"
      className={cn(className)}
      {...delegated}
    >
      <NumOutputsField form={form} />
    </div>
  )
}
