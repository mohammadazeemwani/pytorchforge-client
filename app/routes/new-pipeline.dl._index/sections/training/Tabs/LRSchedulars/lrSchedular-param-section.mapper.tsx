import type { ComponentType } from "react"
import type { UseFormReturn } from "react-hook-form"
import type { PipelineDL, LRSchedular } from "~/types/pipelineDL"
import { cn } from "~/utils/general"
import { ReduceLROnPlateauSection } from "./LRSchedularParamSections/ReduceLROnPlateau/ReduceLROnPlateau.section"

export type LRSchedularSectionProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

const lRSchedular2FormSectionMapper: Record<
  LRSchedular,
  ComponentType<LRSchedularSectionProps>
> = { 
  ReduceLROnPlateau: ReduceLROnPlateauSection
}

export function lrSchedularParamModifierComponent(
  name: LRSchedular,
  props: LRSchedularSectionProps,
) {
  const Component = lRSchedular2FormSectionMapper[name]
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
