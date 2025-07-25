import React from "react"
import { cn } from "~/utils/general"
import { NumClassesField } from "./NumClasses.field"
import { InputTypeField } from "./InputType.field"
import { NumFeaturesField } from "./NumFeatures.field"
import type { PreTrainedSectionProps } from "../../preTrainedModel-param-section.mapper"

export function Wave2LetterSection({
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
      <NumClassesField form={form} />
      <InputTypeField form={form} />
      <NumFeaturesField form={form} />
    </div>
  )
}
