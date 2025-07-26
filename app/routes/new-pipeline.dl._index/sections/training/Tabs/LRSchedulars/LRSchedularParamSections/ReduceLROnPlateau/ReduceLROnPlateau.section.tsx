import React from "react"
import { cn } from "~/utils/general"
import type { LRSchedularSectionProps } from "../../lrSchedular-param-section.mapper"
import { PatienceField } from "./Patience.field"
import { FactorField } from "./Factor.field"
import { ModeField } from "./Mode.field"
import { ThresholdField } from "./Threshold.field"


export function ReduceLROnPlateauSection({
  form,
  className,
  ...delegated
}: LRSchedularSectionProps) {
  return (
    <div
      aria-description="form to change values"
      className={cn(className)}
      {...delegated}
    >
      <PatienceField form={form} />
      <FactorField form={form} />
      <ModeField form={form} />
      <ThresholdField form={form} />
    </div>
  )
}
