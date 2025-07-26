import React from "react"
import { cn } from "~/utils/general"
import type { UseFormReturn } from "react-hook-form"
import type { PipelineDL } from "~/types/pipelineDL"
import { PatienceField } from "./Patience.field"
import { MinDeltaField } from "./MinDelta.field"
import { ModeField } from "./Mode.field"
import { MonitorField } from "./Monitor.field"
import { VerboseField } from "./Verbose.field"
import { RestoreBestWeightsField } from "./RestoreBestWeights.field"


type EarlyStoppingSectionProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function EarlyStoppingSection({
  form,
  className,
  ...delegated
}: EarlyStoppingSectionProps) {
  return (
    <div
      aria-description="early stopping parameters to change"
      className={cn(className)}
      {...delegated}
    >
      <h2 className="mb-6!">Early stopping</h2>
      <div
        className={cn(
          'flex flex-col gap-5 sm:gap-8',
          "w-[90%] sm:w-full sm:grid sm:grid-cols-2 items-start",
        )}
      >
        <PatienceField form={form} />
        <MinDeltaField form={form} />
        <ModeField form={form} />
        <MonitorField form={form} />
        <VerboseField form={form} />
        <RestoreBestWeightsField form={form} />
      </div>
    </div>
  )
}
