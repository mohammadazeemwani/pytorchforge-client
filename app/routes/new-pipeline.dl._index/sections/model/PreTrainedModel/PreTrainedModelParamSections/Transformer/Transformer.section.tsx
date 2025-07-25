import React from "react"
import { cn } from "~/utils/general"
import { DModelField } from "./DModel.field"
import { NHeadField } from "./NHead.field"
import { NumEncoderLayersField } from "./NumEncoderLayers.field"
import { NumDecoderLayersField } from "./NumDecoderLayers.field"
import { DimFeedforwardField } from "./DimFeedforward.field"
import { DropoutField } from "./Dropout.field"
import { ActivationField } from "./Activation.field"
import { LayerNormEpsField } from "./LayerNormEps.field"
import { BatchFirstField } from "./BatchFirst.field"
import { NormFirstField } from "./NormFirst.field"
import { DeviceField } from "./Device.field"
import { DtypeField } from "./Dtype.field"
import type { PreTrainedSectionProps } from "../../preTrainedModel-param-section.mapper"

export function TransformerSection({
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
      <DModelField form={form} />
      <NHeadField form={form} />
      <NumEncoderLayersField form={form} />
      <NumDecoderLayersField form={form} />
      <DimFeedforwardField form={form} />
      <DropoutField form={form} />
      <ActivationField form={form} />
      <LayerNormEpsField form={form} />
      <BatchFirstField form={form} />
      <NormFirstField form={form} />
      <DeviceField form={form} />
      <DtypeField form={form} />
    </div>
  )
}
