import React from "react"
import { cn } from "~/utils/general"
import { SectionRouter } from "./SectionRouter"
import { sectionSlugToLabel, sectionSlugs, defaultTask } from "~/constants/pipelineDL"
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
import type { PipelineDL } from "~/types/pipelineDL"
import { getDefaultPipelineDLSchema } from "~/helpers/pipelineDL"
import { SubmitSteps } from "./SubmitSteps"
import { FormErrorList } from "~/components/FormErrorShow/FormErrorList"

type DLProps = {} & React.ComponentProps<"div">

export function DL({ className, ...delegated }: DLProps) {
  const { currentStep } = useStepContext()
  const form = useForm<PipelineDL>({
    resolver: standardSchemaResolver(pipelineDLSchema),
    defaultValues: getDefaultPipelineDLSchema(defaultTask),
    mode: "onChange",
  })
  const mainTask = form.watch('mainTask')

  // This effect is imp. because other wise when mainTask is changed, defaultValues will still be for defaultTask, not the new one.
  React.useEffect(() => {
    form.reset(getDefaultPipelineDLSchema(mainTask))
  }, [mainTask])

  return (
    <section
      aria-description=""
      className={cn(
        "prose dark:prose-invert", 
        className
      )}
      {...delegated}
    >
      <StepNavigator slugToLabelMapper={sectionSlugToLabel} />
      <FormContext {...form}>
        <form >
          <SectionRouter
            section={sectionSlugs[currentStep - 1]}
            form={form}
          />
        </form>
      </FormContext>
      <FormErrorList className="" />
    </section>
  )
}
