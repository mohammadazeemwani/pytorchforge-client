import type { ComponentType } from "react"
import type { UseFormReturn } from "react-hook-form"
import type { PipelineDL, Metric } from "~/types/pipelineDL"
import { cn } from "~/utils/general"
import { AccuracySection } from "./MetricParamSections/Accuracy/Accuracy.section"
import { F1ScoreSection } from "./MetricParamSections/F1Score/F1Score.section"
import { RecallSection } from "./MetricParamSections/Recall/Recall.section"
import { MeanAbsoluteErrorSection } from "./MetricParamSections/MeanAbsoluteError/MeanAbsoluteError.section"

export type MetricSectionProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

const metric2FormSectionMapper: Record<
  Metric,
  ComponentType<MetricSectionProps>
> = {
  Accuracy: AccuracySection,
  F1Score: F1ScoreSection,
  Recall: RecallSection,
  MeanAbsoluteError: MeanAbsoluteErrorSection
}

export function metricParamModifierComponent(
  name: Metric,
  props: MetricSectionProps,
) {
  const Component = metric2FormSectionMapper[name]
  return (
    <Component
      {...props}
      className={cn(
        "flex flex-col gap-5 sm:gap-8",
        "w-[90%] sm:w-full sm:grid sm:grid-cols-2 items-start",
        props.className,
      )}
    />
  )
}
