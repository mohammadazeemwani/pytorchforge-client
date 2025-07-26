import type { ComponentType } from "react"
import type { UseFormReturn } from "react-hook-form"
import type { PipelineDL, Optimizer } from "~/types/pipelineDL"
import { cn } from "~/utils/general"
import { AdamSection } from "./OptimizerParamSections/Adam/Adam.section"
import { SDGSection } from "./OptimizerParamSections/SDG/SDG.section"
import { RMSpropSection } from "./OptimizerParamSections/RMSprop/RMSprop.section"
import { AdagradSection } from "./OptimizerParamSections/Adagrad/Adagrad.section"
import { NAdamSection } from "./OptimizerParamSections/NAdam/NAdam.section"


export type OptimizerSectionProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

const optimizer2FormSectionMapper: Record<Optimizer, ComponentType<OptimizerSectionProps>> = {
  Adam: AdamSection,
  SDG: SDGSection,
  RMSprop: RMSpropSection,
  Adagrad: AdagradSection,
  NAdam: NAdamSection
}

export function optimizerParamModifierComponent(
  name: Optimizer,
  props: OptimizerSectionProps,
) {
  const Component = optimizer2FormSectionMapper[name]
  return (
    <Component
      {...props}
      className={cn(
        "flex flex-col gap-5 sm:gap-8",
        "w-[90%] sm:w-full sm:grid sm:grid-cols-2 items-start",
        props.className,
      )}
    />
  )
}
