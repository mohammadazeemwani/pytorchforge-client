import React from "react";
import { cn } from "~/utils/general";
import { sectionSlugToLabel } from "~/constants/pipelineDL";
import type { UseFormReturn } from "react-hook-form";
import type { PipelineDL } from "~/types/pipelineDL";


type TrainingSectionProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function TrainingSection({ className, ...delegated}: TrainingSectionProps) {
  return (
    <div
      aria-description=""
      className={cn(
        className
      )}
      {...delegated}
    >
      <h1>{sectionSlugToLabel['training']}</h1>
    </div>
  )
}