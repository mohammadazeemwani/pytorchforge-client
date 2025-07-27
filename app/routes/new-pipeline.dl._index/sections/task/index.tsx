import React from "react";
import { cn } from "~/utils/general";
import { sectionSlugToLabel } from "~/constants/pipelineDL";
import type { UseFormReturn } from "react-hook-form";
import type { PipelineDL } from "~/types/pipelineDL";
import { MainTaskField } from "./MainTask.field";
import { SubTaskField } from "./SubTask.field";
import { DataFormatField } from "./DataFormat.field";
import { DataSourceField } from "./DataSource.field";
import { SubmitSteps } from "../../SubmitSteps";
import { isGoodToGo } from "./helper";
import { useFormErrorContext } from "~/components/FormErrorShow/FormErrorContext";



type TaskSectionProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function TaskSection({ className, form, ...delegated}: TaskSectionProps) {
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
      <h1>{sectionSlugToLabel['task']}</h1>
      <div
        className={cn(
          "flex flex-col gap-8",
          'mb-11',
        )}
      >
        <MainTaskField 
          form={form} 
          className="w-[50%]"
        />
        <SubTaskField 
          form={form}
          className="w-[75%]"
        />
        <DataFormatField
          form={form}
          className="w-[75%]"
        />
        <DataSourceField
          form={form}
          className="w-[75%]"
        />
      </div>
      <SubmitSteps 
        form={form}
        isGoodToGoCallback={handleNext} 
      />
    </div>
  )
}