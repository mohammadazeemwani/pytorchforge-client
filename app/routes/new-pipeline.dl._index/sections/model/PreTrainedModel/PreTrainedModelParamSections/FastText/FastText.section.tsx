import React from "react"
import { cn } from "~/utils/general"
import { LanguageField } from "./Language.field"
import type { PreTrainedSectionProps } from "../../preTrainedModel-param-section.mapper"

export function FastTextSection({
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
      <LanguageField form={form} />
    </div>
  )
}
