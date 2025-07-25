import React from "react"
import { cn } from "~/utils/general"
import { UpsampleScalesField } from "./UpsampleScales.field"
import { NClassesField } from "./NClasses.field"
import { HopLengthField } from "./HopLength.field"
import { NResBlockField } from "./NResBlock.field"
import { NRnnField } from "./NRnn.field"
import { NFcField } from "./NFc.field"
import { KernelSizeField } from "./KernelSize.field"
import { NFreqField } from "./NFreq.field"
import { NHiddenField } from "./NHidden.field"
import { NOutputField } from "./NOutput.field"
import type { PreTrainedSectionProps } from "../../preTrainedModel-param-section.mapper"

export function WaveRNNSection({
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
      <UpsampleScalesField form={form} />
      <NClassesField form={form} />
      <HopLengthField form={form} />
      <NResBlockField form={form} />
      <NRnnField form={form} />
      <NFcField form={form} />
      <KernelSizeField form={form} />
      <NFreqField form={form} />
      <NHiddenField form={form} />
      <NOutputField form={form} />
    </div>
  )
}
