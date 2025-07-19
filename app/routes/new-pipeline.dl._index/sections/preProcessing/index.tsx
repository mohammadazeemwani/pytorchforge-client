import React from "react";
import { cn } from "~/utils/general";
import { sectionSlugToLabel } from "~/constants/pipelineDL";
import type { UseFormReturn } from "react-hook-form";
import type { PipelineDL } from "~/types/pipelineDL";
import { TransformersSelectField } from "./TransformersSelect.field";
import { TransformersReorder } from "./TransformersReorder.field";
import { SubmitSteps } from "../../SubmitSteps";
import { useFormErrorContext } from "~/components/FormErrorShow/FormErrorContext";
import { isGoodToGo } from "./helper";

type PreProcessingSectionProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function PreProcessingSection({ className, form,  ...delegated}: PreProcessingSectionProps) {
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
        className
      )}
      {...delegated}
    >
      <h1>{sectionSlugToLabel['preProcessing']}</h1>
      <div
        className={cn(
          "flex flex-col gap-8",
          "mb-11"
        )}
      >
        <TransformersSelectField 
          form={form}
          className="w-[100%]"
        />
        <TransformersReorder 
          form={form}
          className="w-[100%]"
        />
      </div>
      <SubmitSteps 
        form={form}
        isGoodToGoCallback={handleNext} 
      />
    </div>
  )
}