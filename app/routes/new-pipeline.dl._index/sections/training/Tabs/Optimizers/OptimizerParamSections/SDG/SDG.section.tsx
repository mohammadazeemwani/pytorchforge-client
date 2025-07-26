import React from "react"
import { cn } from "~/utils/general"
import type { OptimizerSectionProps } from "../../optimizer-param-section.mapper"
import { LRField } from "./LR.field"
import { MomentumField } from "./Momentum.field"
import { WeightDecayField } from "./WeightDecay.field"
import { DampeningField } from "./Dampening.field"
import { NesterovField } from "./Nesterov.field"


export function SDGSection({
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
      <MomentumField form={form} />
      <WeightDecayField form={form} />
      <DampeningField form={form} />
      <NesterovField form={form} />
    </div>
  )
}
