import React from "react"
import { cn } from "~/utils/general"
import { WeightsField } from "./Weights.field"
import { NumClassesField } from "./NumClasses.field"
import type { PreTrainedSectionProps } from "../../preTrainedModel-param-section.mapper"

export function DeepLabV3Section({
  form,
  className,
  ...delegated
}: PreTrainedSectionProps) {
  return (
    <div
      aria-description="form to change values"
      className={cn(className)}
      {...delegated}
    >
      <WeightsField form={form} />
      <NumClassesField form={form} />
    </div>
  )
}
