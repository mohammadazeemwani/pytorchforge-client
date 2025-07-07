import React from "react"
import { cn } from "~/utils/general"
import { SectionRouter } from "./SectionRouter"
import { sectionSlugToLabel, sectionSlugs } from "~/constants/pipelineDL"
import {
  StepBackButton,
  StepNavigator,
  StepNextButton,
  useStepContext,
} from "~/components/StepNavigator"
import { Form as FormContext } from "~/components/Form"
import { useForm } from "react-hook-form"
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { pipelineDLSchema } from "~/schema/pipelineDL"
import { usePipelineDLStore } from "~/store/pipelineDL"
import type { PipelineDL } from "~/types/pipelineDL"
import * as z from "zod/v4"

type DLProps = {} & React.ComponentProps<"div">

export function DL({ className, ...delegated }: DLProps) {
  const { currentStep } = useStepContext()
  const { pipeline } = usePipelineDLStore()
  console.log(pipeline)
  const form = useForm<PipelineDL>({
    resolver: standardSchemaResolver(pipelineDLSchema),
    defaultValues: pipeline,
    mode: "onChange",
  })

  return (
    <section
      aria-description=""
      className={cn("prose dark:prose-invert", className)}
      {...delegated}
    >
      <StepNavigator slugToLabelMapper={sectionSlugToLabel} />
      <FormContext {...form}>
        <form>
          <SectionRouter
            section={sectionSlugs[currentStep - 1]}
            control={form.control}
          />
        </form>
      </FormContext>

      <div className="flex justify-between">
        <StepBackButton />
        <StepNextButton />
      </div>
    </section>
  )
}
