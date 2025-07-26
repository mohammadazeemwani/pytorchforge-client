import React from "react";
import { cn } from "~/utils/general";
import { sectionSlugToLabel } from "~/constants/pipelineDL";
import type { UseFormReturn } from "react-hook-form";
import type { PipelineDL } from "~/types/pipelineDL";

type SummarySectionProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function SummarySection({ className, form, ...delegated}: SummarySectionProps) {
  return (
    <div
      aria-description="summary section"
      className={cn(
        className
      )}
      {...delegated}
    >
      <h1>{sectionSlugToLabel['summary']}</h1>
    </div>
  )
}