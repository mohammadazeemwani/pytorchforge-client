import React from "react";
import { cn } from "~/utils/general";
import { sectionSlugToLabel } from "~/constants/pipelineDL";
import type { UseFormReturn } from "react-hook-form";
import type { PipelineDL } from "~/types/pipelineDL";
import { SubmitSteps } from "../../SubmitSteps";
import { isGoodToGo } from "./helper";
import { useFormErrorContext } from "~/components/FormErrorShow/FormErrorContext";
import { LossesSection } from "./Tabs/Losses/Losses.section";
import { OptimizersSection } from "./Tabs/Optimizers/Optimizers.section";
import { MetricsSection } from "./Tabs/Metrics/Metrics.section";
import { LRSchedularsSection } from "./Tabs/LRSchedulars/LRSchedulars.section";
import { MonitoringSection } from "./Monitoring/Monitoring.section";
import { TrainingHyperParametersSection } from "./TrainingHyperParameters/TrainingHyperParameters.section";
import { EarlyStoppingSection } from "./EarlyStopping/EarlyStopping.section";



type TrainingSectionProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function TrainingSection({ className, form, ...delegated}: TrainingSectionProps) {
  const { setError } = useFormErrorContext()

  const handleNext = React.useCallback(() => {
    const { success, error } = isGoodToGo({ form });
    if (success) {
      setError(null);
      return true
    } else {
      setError(error);
      return false
    }
  }, [setError])

  return (
    <div
      aria-description=""
      className={cn(
        className,
      )}
      {...delegated}
    >
      <h1>{sectionSlugToLabel['training']}</h1>
      <div
        className={cn(
          "flex flex-col gap-8",
          'mb-11',
        )}
      >
      {/* name of each tab group should be unique */}
      <div className="tabs tabs-lift">
        <input type="radio" name="training" className="tab" aria-label="Loss" defaultChecked/>
        <div className="tab-content bg-base-100 border-base-300 p-6">
          <LossesSection form={form} />
        </div>

        <input type="radio" name="training" className="tab" aria-label="Optimizer" />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          <OptimizersSection form={form} />
        </div>

        <input type="radio" name="training" className="tab" aria-label="Metric" />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          <MetricsSection form={form} />
        </div>

        <input type="radio" name="training" className="tab" aria-label="LRSchedular" />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          <LRSchedularsSection form={form} />
        </div>
      </div>

      <MonitoringSection form={form} />
      <TrainingHyperParametersSection form={form} />
      <EarlyStoppingSection form={form} />

      </div>
      <SubmitSteps 
        form={form}
        isGoodToGoCallback={handleNext} 
      />
    </div>
  )
}