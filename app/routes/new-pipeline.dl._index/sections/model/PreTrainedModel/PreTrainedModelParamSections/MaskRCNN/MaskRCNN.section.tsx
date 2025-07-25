import React from "react"
import { cn } from "~/utils/general"
import { BackboneField } from "./Backbone.field"
import { NumClassesField } from "./NumClasses.field"
import type { PreTrainedSectionProps } from "../../preTrainedModel-param-section.mapper"

export function MaskRCNNSection({
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
      <BackboneField form={form} />
      <NumClassesField form={form} />
    </div>
  )
}
