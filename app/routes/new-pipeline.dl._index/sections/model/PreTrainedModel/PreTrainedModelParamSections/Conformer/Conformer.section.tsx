import React from "react"
import { cn } from "~/utils/general"
import { InputDimField } from "./InputDim.field"
import { NumHeadsField } from "./NumHeads.field"
import { FFNDimField } from "./FFNDim.field"
import { NumLayersField } from "./NumLayers.field"
import { DepthwiseConvKernelSizeField } from "./DepthwiseConvKernelSize.field"
import { DropoutField } from "./Dropout.field"
import { UseGroupNormField } from "./UseGroupNorm.field"
import { ConvolutionFirstField } from "./ConvolutionFirst.field"
import type { PreTrainedSectionProps } from "../../preTrainedModel-param-section.mapper"

export function ConformerSection({
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
      <InputDimField form={form} />
      <NumHeadsField form={form} />
      <FFNDimField form={form} />
      <NumLayersField form={form} />
      <DepthwiseConvKernelSizeField form={form} />
      <DropoutField form={form} />
      <UseGroupNormField form={form} />
      <ConvolutionFirstField form={form} />
    </div>
  )
}
