import React from "react";
import { cn } from "~/utils/general";
import { sectionSlugToLabel } from "~/constants/pipelineDL";

type ModelSectionProps = {} & React.ComponentProps<'div'>

export function ModelSection({ className, ...delegated}: ModelSectionProps) {
  return (
    <div
      aria-description=""
      className={cn(
        className
      )}
      {...delegated}
    >
      <h1>{sectionSlugToLabel['model']}</h1>
    </div>
  )
}