import React from "react";
import { cn } from "~/utils/general";
import { sectionSlugToLabel } from "~/constants/pipelineDL";
import type { UseFormReturn } from "react-hook-form";
import type { PipelineDL } from "~/types/pipelineDL";
import { structurizePipelineDLFormData } from "~/helpers/structurizeData";
import { CodeSummary } from "~/components/CodeSummary";

type SummarySectionProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function SummarySection({ className, form, ...delegated}: SummarySectionProps) {
  const finalConfig = React.useMemo(() => {
    return structurizePipelineDLFormData(form.getValues())
  }, [form])

  // At this point, we know form has no errors
  React.useEffect(() => {
    form.clearErrors()
  }, [form])

  return (
    <div
      aria-description="summary section"
      className={cn(
        className
      )}
      {...delegated}
    >
      <h1>{sectionSlugToLabel['summary']}</h1>
      <div>
        <button className="btn btn-primary" type="submit">Generate code</button>
      </div>
      <CodeSummary 
        className="mt-5"
        label="Show pipeline JSON summary"
        code={JSON.stringify(finalConfig, null, 2)}
      />
    </div>
  )
}