import React from "react";
import type { UseFormReturn } from "react-hook-form";
import type { PipelineDL, PreTrainedModels } from "~/types/pipelineDL";
import { cn } from "~/utils/general";
import { getAllowedPreTrainedModel } from "~/helpers/pipelineDL";
import { ComboBoxResponsive } from "~/components/ComboBoxResponsive";
import type { Value } from "~/components/ComboBoxResponsive";
import { getPreTrainedParamModifierComponent } from "./preTrainedModel-param-section.mapper";
import { RotateCwIcon } from "~/components/AnimatedIcons";

type PreTrainedModelSectionProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

/**
 * Here only one model needs to be selected and below it will be a cnotainer to chagne its props.
 */
export function PreTrainedModelSection({ form, className, ...delegated}: PreTrainedModelSectionProps) {
  const mainTask = form.watch('mainTask')

  const preTrainedModels = React.useMemo(() => {
    return getAllowedPreTrainedModel(mainTask).map(m => ({ label: m, value: m}))
  }, [mainTask])

  const [selectedModel, setSelectedModel] = React.useState<Value | undefined>(() => {
    const val = form.getValues('pretrainedModel');
    // if val is undefined
    if (!val) return undefined;
    return { label: val, value: val}
  })

  const ParamModifier = React.useMemo(() => {
    if (!selectedModel) return null;
    form.setValue('pretrainedModel', selectedModel.label as PreTrainedModels);
    return getPreTrainedParamModifierComponent(
      selectedModel.label as PreTrainedModels,
      { form }
    )
  }, [selectedModel, form])

  const resetSection = React.useCallback(() => {
    const resetFieldKey = `pretrainedModelsData.${selectedModel?.label}`
    form.resetField(resetFieldKey as any)
  }, [selectedModel, form])

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
          values={preTrainedModels} 
          selectedValue={selectedModel}
          setSelectedValue={setSelectedModel}
          label="Select Model"
          className="min-w-[62%] sm:min-w-[36%] shadow-lg shadow-base-content/22"
        />
        {selectedModel && (
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