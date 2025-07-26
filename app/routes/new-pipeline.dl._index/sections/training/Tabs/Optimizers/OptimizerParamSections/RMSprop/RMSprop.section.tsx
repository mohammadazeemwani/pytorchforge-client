import React from "react"
import { cn } from "~/utils/general"
import type { OptimizerSectionProps } from "../../optimizer-param-section.mapper"
import { LRField } from "./LR.field"
import { AlphaField } from "./Alpha.field"
import { EPSField } from "./EPS.field"
import { WeightDecayField } from "./WeightDecay.field"
import { MomentumField } from "./Momentum.field"
import { CenteredField } from "./Centered.field"


export function RMSpropSection({
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
      <AlphaField form={form} />
      <EPSField form={form} />
      <WeightDecayField form={form} />
      <MomentumField form={form} />
      <CenteredField form={form} />
    </div>
  )
}
