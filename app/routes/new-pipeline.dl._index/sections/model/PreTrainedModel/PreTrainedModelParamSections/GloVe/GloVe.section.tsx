import React from "react"
import { cn } from "~/utils/general"
import { DimField } from "./Dim.field"
import { NameField } from "./Name.field"
import type { PreTrainedSectionProps } from "../../preTrainedModel-param-section.mapper"

export function GloVeSection({
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
      <DimField form={form} />
      <NameField form={form} />
    </div>
  )
}
