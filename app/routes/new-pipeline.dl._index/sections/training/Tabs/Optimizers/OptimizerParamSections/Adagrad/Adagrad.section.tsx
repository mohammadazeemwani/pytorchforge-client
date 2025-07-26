import React from "react"
import { cn } from "~/utils/general"
import type { OptimizerSectionProps } from "../../optimizer-param-section.mapper"
import { LRField } from "./LR.field"
import { LRDecayField } from "./LRDecay.field"
import { WeightDecayField } from "./WeightDecay.field"
import { InitialAccumulatorField } from "./InitialAccumulator.field"

export function AdagradSection({
  form,
  className,
  ...delegated
}: OptimizerSectionProps) {
  return (
    <div
      aria-description="form to change values"
      className={cn(className)}
      {...delegated}
    >
      <LRField form={form} />
      <LRDecayField form={form} />
      <WeightDecayField form={form} />
      <InitialAccumulatorField form={form} />
    </div>
  )
}
