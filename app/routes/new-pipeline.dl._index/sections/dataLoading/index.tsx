import React from "react";
import { cn } from "~/utils/general";
import { sectionSlugToLabel } from "~/constants/pipelineDL";
import type { UseFormReturn } from "react-hook-form";
import type { PipelineDL } from "~/types/pipelineDL";
import { DataLoadingEditor } from "./dataLoadingEditor";
import { isGoodToGo } from "./helper";
import { SubmitSteps } from "../../SubmitSteps";
import { useFormErrorContext } from "~/components/FormErrorShow/FormErrorContext";



type DataLoadingSectionProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function DataLoadingSection({ className, form, ...delegated}: DataLoadingSectionProps) {
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
      <h1>{sectionSlugToLabel['dataLoading']}</h1>
      <div
        className={cn(
          "flex flex-col gap-8",
          'mb-11',
        )}
      >
        <DataLoadingEditor form={form} />
      </div>
      <SubmitSteps 
        form={form}
        isGoodToGoCallback={handleNext} 
      />
    </div>
  )
}