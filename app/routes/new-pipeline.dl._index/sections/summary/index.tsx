import React from "react";
import { cn } from "~/utils/general";
import { sectionSlugToLabel } from "~/constants/pipelineDL";

type SummarySectionProps = {} & React.ComponentProps<'div'>

export function SummarySection({ className, ...delegated}: SummarySectionProps) {
  return (
    <div
      aria-description=""
      className={cn(
        className
      )}
      {...delegated}
    >
      <h1>{sectionSlugToLabel['summary']}</h1>
    </div>
  )
}