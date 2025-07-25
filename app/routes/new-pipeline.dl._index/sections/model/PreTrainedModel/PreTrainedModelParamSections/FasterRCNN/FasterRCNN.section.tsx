import React from "react"
import { cn } from "~/utils/general"
import { BackboneField } from "./Backbone.field"
import { NumClassesField } from "./NumClasses.field"
import { MinSizeField } from "./MinSize.field"
import { MaxSizeField } from "./MaxSize.field"
import type { PreTrainedSectionProps } from "../../preTrainedModel-param-section.mapper"

export function FasterRCNNSection({
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
      <MinSizeField form={form} />
      <MaxSizeField form={form} />
    </div>
  )
}
