import React from "react"
import { cn } from "~/utils/general"
import { PretrainedField } from "./Pretrained.field"
import { NumClassesField } from "./NumClasses.field"
import type { PreTrainedSectionProps } from "../../preTrainedModel-param-section.mapper"

export function ResNetSection({
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
      <PretrainedField form={form} />
      <NumClassesField form={form} />
    </div>
  )
}
