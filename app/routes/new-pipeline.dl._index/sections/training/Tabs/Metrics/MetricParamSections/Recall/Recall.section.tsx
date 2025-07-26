import React from "react"
import { cn } from "~/utils/general"
import type { MetricSectionProps } from "../../metric-param-section.mapper"
import { TaskField } from "./Task.field"
import { NumClassesField } from "./NumClasses.field"
import { ThresholdField } from "./Threshold.field"
import { TopKField } from "./TopK.field"
import { AverageField } from "./Average.field"

export function RecallSection({
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
      <TaskField form={form} />
      <NumClassesField form={form} />
      <ThresholdField form={form} />
      <TopKField form={form} />
      <AverageField form={form} />
    </div>
  )
}
