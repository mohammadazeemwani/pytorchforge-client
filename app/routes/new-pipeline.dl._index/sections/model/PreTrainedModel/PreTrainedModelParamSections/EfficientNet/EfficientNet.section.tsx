import React from "react"
import { cn } from "~/utils/general"
import { WidthMultField } from "./WidthMult.field"
import { DepthMultField } from "./DepthMult.field"
import { DropoutField } from "./Dropout.field"
import type { PreTrainedSectionProps } from "../../preTrainedModel-param-section.mapper"

export function EfficientNetSection({
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
      <WidthMultField form={form} />
      <DepthMultField form={form} />
      <DropoutField form={form} />
    </div>
  )
}
