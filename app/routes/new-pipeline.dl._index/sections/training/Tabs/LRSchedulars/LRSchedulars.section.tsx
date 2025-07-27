import React from "react"
import type { UseFormReturn } from "react-hook-form"
import type { LRSchedular, PipelineDL } from "~/types/pipelineDL"
import { cn } from "~/utils/general"
import { getAllowedLRSchedulars } from "~/helpers/pipelineDL"
import { ComboBoxResponsive } from "~/components/ComboBoxResponsive"
import type { Value } from "~/components/ComboBoxResponsive"
import { lrSchedularParamModifierComponent } from "./lrSchedular-param-section.mapper"
import { RotateCwIcon } from "~/components/AnimatedIcons"

type LRSchedularsSectionProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function LRSchedularsSection({
  form,
  className,
  ...delegated
}: LRSchedularsSectionProps) {
  const lrSchedulars = React.useMemo(() => {
    return getAllowedLRSchedulars().map((m) => ({ label: m, value: m }))
  }, [])

  const [selectedLRSchedular, setSelectedLRSchedular] = React.useState<
    Value | undefined
  >(() => {
    const val = form.getValues("lrSchedular")
    // if val is undefined
    if (!val) return undefined
    return { label: val, value: val }
  })

  const ParamModifier = React.useMemo(() => {
    if (!selectedLRSchedular) return null
    form.setValue("lrSchedular", selectedLRSchedular.label as LRSchedular)
    return lrSchedularParamModifierComponent(selectedLRSchedular.label as LRSchedular, {
      form,
    })
  }, [selectedLRSchedular, form])

  const resetSection = React.useCallback(() => {
    const resetFieldKey = `lrSchedularsData.${selectedLRSchedular?.label}`
    form.resetField(resetFieldKey as any)
  }, [selectedLRSchedular, form])

  return (
    <div
      aria-description=""
      className={cn("flex flex-col gap-8 sm:gap-12", className)}
      {...delegated}
    >
      <div className="flex gap-3 sm:gap-4 justify-center">
        <ComboBoxResponsive
          values={lrSchedulars}
          selectedValue={selectedLRSchedular}
          setSelectedValue={setSelectedLRSchedular}
          label="Select LRSchedular"
          className="min-w-[62%] sm:min-w-[36%] shadow-lg shadow-base-content/22"
        />
        {selectedLRSchedular && (
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
