import React from "react"
import { cn } from "~/utils/general"
import { ImageSizeField } from "./ImageSize.field"
import { PatchSizeField } from "./PatchSize.field"
import { NumLayersField } from "./NumLayers.field"
import { NumHeadsField } from "./NumHeads.field"
import { HiddenDimField } from "./HiddenDim.field"
import type { PreTrainedSectionProps } from "../../preTrainedModel-param-section.mapper"

export function VisionTransformerSection({
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
      <ImageSizeField form={form} />
      <PatchSizeField form={form} />
      <NumLayersField form={form} />
      <NumHeadsField form={form} />
      <HiddenDimField form={form} />
    </div>
  )
}
