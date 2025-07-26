import React from "react"
import { cn } from "~/utils/general"
import type { LossSectionProps } from "../../loss-param-section.mapper"
import { SizeAverageField } from "./SizeAverage.field"
import { ReduceField } from "./Reduce.field"
import { ReductionField } from "./Reduction.field"

export function L1LossSection({
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
      <ReductionField form={form} />
      <SizeAverageField form={form} />
      <ReduceField form={form} />
    </div>
  )
}
