import type { ComponentType } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { PipelineDL, Metrics } from "~/types/pipelineDL";
import { cn } from "~/utils/general";
import { AccuracySection } from "./MetricParamSections/Accuracy/Accuracy.section"
import { F1ScoreSection } from "./MetricParamSections/F1Score/F1Score.section"
import { RecallSection } from "./MetricParamSections/Recall/Recall.section"
import { MeanAbsoluteErrorSection } from "./MetricParamSections/MeanAbsoluteError/MeanAbsoluteError.section"


export type MetricSectionProps = {
  form: UseFormReturn<PipelineDL>,
} & React.ComponentProps<'div'>

const metric2FormSectionMapper: Record<
  Metrics[number],
  ComponentType<MetricSectionProps>
> = {
  Accuracy: AccuracySection,
  F1Score: F1ScoreSection,
  Recall: RecallSection,
  MeanAbsoluteError: MeanAbsoluteErrorSection
}

export function MetricParamModifierComponent({
  name,
  props,
}: {
  name: Metrics[number],
  props: MetricSectionProps,
}) {
  const Component = metric2FormSectionMapper[name]
  return <Component {...props} />
}
