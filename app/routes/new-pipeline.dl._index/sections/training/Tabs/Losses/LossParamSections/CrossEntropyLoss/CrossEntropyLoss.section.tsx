import React from "react"
import { cn } from "~/utils/general"
import type { LossSectionProps } from "../../loss-param-section.mapper"
import { SizeAverageField } from "./SizeAverage.field"
import { WeightField } from "./weight.field"
import { IgnoreIndexField } from "./IgnoreIndex.field"
import { ReduceField } from "./Reduce.field"
import { ReductionField } from "./Reduction.field"
import { LabelSmoothingField } from "./LabelSmoothing.field"

export function CrossEntropyLossSection({
  form,
  className,
  ...delegated
}: LossSectionProps) {
  return (
    <div
      aria-description="form to change values"
      className={cn(className)}
      {...delegated}
    >
      <WeightField form={form} />
      <IgnoreIndexField form={form} />
      <SizeAverageField form={form} />
      <ReduceField form={form} />
      <ReductionField form={form} />
      <LabelSmoothingField form={form} />
    </div>
  )
}
