import React from "react"
import type { UseFormReturn } from "react-hook-form"
import type { Metric, PipelineDL } from "~/types/pipelineDL"
import { cn } from "~/utils/general"
import { getAllowedMetrics } from "~/helpers/pipelineDL"
import { ComboBoxResponsive } from "~/components/ComboBoxResponsive"
import type { Value } from "~/components/ComboBoxResponsive"
import { metricParamModifierComponent } from "./metric-param-section.mapper"
import { RotateCwIcon } from "~/components/AnimatedIcons"

type MetricsSectionProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function MetricsSection({
  form,
  className,
  ...delegated
}: MetricsSectionProps) {
  const metrics = React.useMemo(() => {
    return getAllowedMetrics().map((m) => ({ label: m, value: m }))
  }, [])

  const [selectedMetric, setSelectedMetric] = React.useState<
    Value | undefined
  >(() => {
    const val = form.getValues("metric")
    // if val is undefined
    if (!val) return undefined
    return { label: val, value: val }
  })

  const ParamModifier = React.useMemo(() => {
    if (!selectedMetric) return null
    form.setValue("metric", selectedMetric.label as Metric)
    return metricParamModifierComponent(selectedMetric.label as Metric, {
      form,
    })
  }, [selectedMetric, form])

  const resetSection = React.useCallback(() => {
    const resetFieldKey = `metricsData.${selectedMetric?.label}`
    console.log(resetFieldKey)
    form.resetField(resetFieldKey as any)
  }, [selectedMetric, form])

  return (
    <div
      aria-description=""
      className={cn("flex flex-col gap-8 sm:gap-12", className)}
      {...delegated}
    >
      <div className="flex gap-3 sm:gap-4 justify-center">
        <ComboBoxResponsive
          values={metrics}
          selectedValue={selectedMetric}
          setSelectedValue={setSelectedMetric}
          label="Select Metric"
          className="min-w-[62%] sm:min-w-[36%] shadow-lg shadow-base-content/22"
        />
        {selectedMetric && (
          <button
            title="reset the values in this section"
            onClick={resetSection}
            className="btn btn-success"
            type="button"
          >
            <RotateCwIcon className="w-[1.3rem]" />
          </button>
        )}
      </div>
      {ParamModifier}
    </div>
  )
}
