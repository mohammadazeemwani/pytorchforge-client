import React from "react";
import { cn } from "~/utils/general";
import { sectionSlugToLabel } from "~/constants/pipelineDL";

type TrainingSectionProps = {} & React.ComponentProps<'div'>

export function TrainingSection({ className, ...delegated}: TrainingSectionProps) {
  return (
    <div
      aria-description=""
      className={cn(
        'prose dark:prose-invert',
        className
      )}
      {...delegated}
    >
      <h1>{sectionSlugToLabel['training']}</h1>
    </div>
  )
}