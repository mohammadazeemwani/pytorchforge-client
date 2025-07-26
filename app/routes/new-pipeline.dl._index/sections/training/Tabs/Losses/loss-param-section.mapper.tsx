import type { ComponentType } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { PipelineDL, Loss } from "~/types/pipelineDL";
import { cn } from "~/utils/general";
import { CrossEntropyLossSection } from "./LossParamSections/CrossEntropyLoss/CrossEntropyLoss.section";
import { BCELossSection } from "./LossParamSections/BCELoss/BCELoss.section";
import { BCEWithLogitsLossSection } from "./LossParamSections/BCEWithLogitsLoss/BCEWithLogitsLoss.section";
import { MSELossSection } from "./LossParamSections/MSELoss/MSELoss.section";
import { L1LossSection } from "./LossParamSections/L1Loss/L1Loss.section";


export type LossSectionProps = {
  form: UseFormReturn<PipelineDL>,
} & React.ComponentProps<'div'>

const loss2FormSectionMapper: Record<
  Loss,
  ComponentType<LossSectionProps>
> = {
  CrossEntropyLoss: CrossEntropyLossSection,
  BCELoss: BCELossSection,
  BCEWithLogitsLoss: BCEWithLogitsLossSection,
  MSELoss: MSELossSection,
  L1Loss: L1LossSection
}


export function lossParamModifierComponent(
  name: Loss,
  props: LossSectionProps
) {
  const Component = loss2FormSectionMapper[name];
  return (
    <Component 
      {...props} 
      className={cn(
        'flex flex-col gap-5 sm:gap-8',
        "w-[90%] sm:w-full sm:grid sm:grid-cols-2 items-start",
        props.className
      )}
    />
  )
}