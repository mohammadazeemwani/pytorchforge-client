import React from "react";
import type { UseFormReturn } from "react-hook-form";
import type { PipelineDL, PreTrainedModels } from "~/types/pipelineDL";
import { cn } from "~/utils/general";
import { getAllowedPreTrainedModel } from "~/helpers/pipelineDL";
import { ComboBoxResponsive } from "~/components/ComboBoxResponsive";
import type { Value } from "~/components/ComboBoxResponsive";
import { getPreTrainedParamModifierComponent } from "./preTrainedModel-param-section.mapper";

type PreTrainedModelFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

/**
 * Here only one model needs to be selected and below it will be a cnotainer to chagne its props.
 */
export function PreTrainedModelField({ form, className, ...delegated}: PreTrainedModelFieldProps) {
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
    return getPreTrainedParamModifierComponent(
      selectedModel.label as PreTrainedModels,
      { form }
    )
  }, [selectedModel])

  return (
    <div
      aria-description=""
      className={cn(
        'prose dark:prose-invert',
        'flex flex-col gap-8 ',
        className
      )}
      {...delegated}
    >
      <ComboBoxResponsive 
        values={preTrainedModels} 
        selectedValue={selectedModel}
        setSelectedValue={setSelectedModel}
        label="Select Model"
        className="min-w-[55%] sm:min-w-[35%] sm:mx-auto"
      />
      {ParamModifier}

    </div>
  )
  
}