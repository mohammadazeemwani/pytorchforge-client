import React from "react";
import { cn } from "~/utils/general";
import { sectionSlugToLabel } from "~/constants/pipelineDL";


type PreProcessingSectionProps = {} & React.ComponentProps<'div'>

export function PreProcessingSection({ className, ...delegated}: PreProcessingSectionProps) {
  return (
    <div
      aria-description=""
      className={cn(
        className
      )}
      {...delegated}
    >
      <h1>{sectionSlugToLabel['preProcessing']}</h1>
    </div>
  )
}