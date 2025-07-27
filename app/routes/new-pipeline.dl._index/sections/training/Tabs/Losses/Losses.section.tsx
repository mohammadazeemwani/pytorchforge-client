import React from "react";
import type { UseFormReturn } from "react-hook-form";
import type { Loss, PipelineDL } from "~/types/pipelineDL";
import { cn } from "~/utils/general";
import { getAllowedLosses  } from "~/helpers/pipelineDL";
import { ComboBoxResponsive } from "~/components/ComboBoxResponsive";
import type { Value } from "~/components/ComboBoxResponsive";
import { lossParamModifierComponent } from "./loss-param-section.mapper";
import { RotateCwIcon } from "~/components/AnimatedIcons";

type LossesSectionProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>


export function LossesSection({ form, className, ...delegated}: LossesSectionProps) {

  const losses = React.useMemo(() => {
    return getAllowedLosses().map(m => ({ label: m, value: m}))
  }, [])

  const [selectedLoss, setSelectedLoss] = React.useState<Value | undefined>(() => {
    const val = form.getValues('loss');
    // if val is undefined
    if (!val) return undefined;
    return { label: val, value: val}
  })

  const ParamModifier = React.useMemo(() => {
    if (!selectedLoss) return null;
    form.setValue('loss', selectedLoss.label as Loss);
    return lossParamModifierComponent(
      selectedLoss.label as Loss,
      { form }
    )
  }, [selectedLoss, form])

  const resetSection = React.useCallback(() => {
    const resetFieldKey = `lossesData.${selectedLoss?.label}`
    form.resetField(resetFieldKey as any)
  }, [selectedLoss, form])

  return (
    <div
      aria-description=""
      className={cn(
        'flex flex-col gap-8 sm:gap-12',
        className
      )}
      {...delegated}
    >
      <div className="flex gap-3 sm:gap-4 justify-center">
        <ComboBoxResponsive 
          values={losses} 
          selectedValue={selectedLoss}
          setSelectedValue={setSelectedLoss}
          label="Select Loss"
          className="min-w-[62%] sm:min-w-[36%] shadow-lg shadow-base-content/22"
        />
        {selectedLoss && (
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