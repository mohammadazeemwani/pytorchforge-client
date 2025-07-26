import React from "react"
import { cn } from "~/utils/general"
import type { UseFormReturn } from "react-hook-form"
import type { PipelineDL } from "~/types/pipelineDL"
import { BatchSizeField } from "./BatchSize.field"
import { LearningRateField } from "./LearningRate.field"
import { EpochsField } from "./Epochs.field"
import { WeightDecayField } from "./WeightDecay.field"

type TrainingHyperParametersSectionProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function TrainingHyperParametersSection({
  form,
  className,
  ...delegated
}: TrainingHyperParametersSectionProps) {
  return (
    <div
      aria-description="training hyper parameters to change"
      className={cn(className)}
      {...delegated}
    >
      <h2 className="mb-6!">Training hyper parameters</h2>
      <div
        className={cn(
          'flex flex-col gap-5 sm:gap-8',
          "w-[90%] sm:w-full sm:grid sm:grid-cols-2 items-start",
        )}
      >
        <BatchSizeField form={form} />
        <LearningRateField form={form} />
        <EpochsField form={form} />
        <WeightDecayField form={form} />
      </div>
    </div>
  )
}
