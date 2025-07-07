import React from "react";
import { cn } from "~/utils/general";
import { sectionSlugToLabel } from "~/constants/pipelineDL";
import { MainTaskField, schema as MainTaskSchema } from "./MainTask.field";
import { Form, } from "~/components/Form"
import { useForm, type Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StepBackButton, StepNextButton } from "~/components/StepNavigator";
import type { PipelineDL } from "~/types/pipelineDL";



type TaskSectionProps = {
  control: Control<PipelineDL>
} & React.ComponentProps<'div'>

export function TaskSection({ className, control, ...delegated}: TaskSectionProps) {

  return (
    <div
      aria-description=""
      className={cn(
        'prose dark:prose-invert',
        className,
      )}
      {...delegated}
    >
      <h1>{sectionSlugToLabel['task']}</h1>

        <MainTaskField 
          control={control} 
          className="not-prose w-[8rem]"
        />
    </div>
  )
}