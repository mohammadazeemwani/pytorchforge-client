import React from "react"
import { cn } from "~/utils/general"
import type { OptimizerSectionProps } from "../../optimizer-param-section.mapper"
import { LRField } from "./LR.field"
import { BetasField } from "./Betas.field"
import { EPSField } from "./EPS.field"
import { WeightDecayField } from "./WeightDecay.field";
import { AmsgradField } from "./Amsgrad.field"


export function AdamSection({
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
      <BetasField form={form} />
      <EPSField form={form} />
      <WeightDecayField form={form} />
      <AmsgradField form={form} />
    </div>
  )
}
