import React from "react"
import type { UseFormReturn } from "react-hook-form"
import type { Optimizer, PipelineDL } from "~/types/pipelineDL"
import { cn } from "~/utils/general"
import { getAllowedOptimizers } from "~/helpers/pipelineDL"
import { ComboBoxResponsive } from "~/components/ComboBoxResponsive"
import type { Value } from "~/components/ComboBoxResponsive"
import { optimizerParamModifierComponent } from "./optimizer-param-section.mapper"
import { RotateCwIcon } from "~/components/AnimatedIcons"

type OptimizersSectionProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function OptimizersSection({
  form,
  className,
  ...delegated
}: OptimizersSectionProps) {
  const optimizers = React.useMemo(() => {
    return getAllowedOptimizers().map((m) => ({ label: m, value: m }))
  }, [])

  const [selectedOptimizer, setSelectedOptimizer] = React.useState<Value | undefined>(
    () => {
      const val = form.getValues("optimizer")
      // if val is undefined
      if (!val) return undefined
      return { label: val, value: val }
    },
  )

  const ParamModifier = React.useMemo(() => {
    if (!selectedOptimizer) return null
    form.setValue("optimizer", selectedOptimizer.label as Optimizer)
    return optimizerParamModifierComponent(selectedOptimizer.label as Optimizer, { form })
  }, [selectedOptimizer, form])

  const resetSection = React.useCallback(() => {
    const resetFieldKey = `optimizersData.${selectedOptimizer?.label}`
    form.resetField(resetFieldKey as any)
  }, [selectedOptimizer, form])

  return (
    <div
      aria-description=""
      className={cn("flex flex-col gap-8 sm:gap-12", className)}
      {...delegated}
    >
      <div className="flex gap-3 sm:gap-4 justify-center">
        <ComboBoxResponsive
          values={optimizers}
          selectedValue={selectedOptimizer}
          setSelectedValue={setSelectedOptimizer}
          label="Select Optimizer"
          className="min-w-[62%] sm:min-w-[36%] shadow-lg shadow-base-content/22"
        />
        {selectedOptimizer && (
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
