import type { ComponentType } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { PipelineDL, PreTrainedModels } from "~/types/pipelineDL";
import { ResNetSection } from "./PreTrainedModelParamFields/ResNet/ResNet.section";
import { cn } from "~/utils/general";
import { EfficientNetSection } from "./PreTrainedModelParamFields/EfficientNet/EfficientNet.section";
import { VisionTransformerSection } from "./PreTrainedModelParamFields/VisionTransformer/VisionTransformer.section";
import { FasterRCNNSection } from "./PreTrainedModelParamFields/FasterRCNN/FasterRCNN.section";
import { MaskRCNNSection } from "./PreTrainedModelParamFields/MaskRCNN/MaskRCNN.section";
import { DeepLabV3Section } from "./PreTrainedModelParamFields/DeepLabV3/DeepLabV3.section";
import { GloVeSection } from "./PreTrainedModelParamFields/GloVe/GloVe.section";
import { FastTextSection } from "./PreTrainedModelParamFields/FastText/FastText.section";
import { TransformerSection } from "./PreTrainedModelParamFields/Transformer/Transformer.section";
import { ConformerSection } from "./PreTrainedModelParamFields/Conformer/Conformer.section";
import { Wave2LetterSection } from "./PreTrainedModelParamFields/Wave2Letter/Wave2Letter.section";

export type PreTrainedSectionProps = {
  form: UseFormReturn<PipelineDL>,
} & React.ComponentProps<'div'>

const preTrained2FormSectionMapper: Record<
  PreTrainedModels,
  ComponentType<PreTrainedSectionProps>
> = {
  ResNet: ResNetSection,
  EfficientNet: EfficientNetSection,
  VisionTransformer: VisionTransformerSection,
  FasterRCNN: FasterRCNNSection,
  MaskRCNN: MaskRCNNSection,
  DeepLabV3: DeepLabV3Section,
  GloVe: GloVeSection,
  FastText: FastTextSection,
  Transformer: TransformerSection,
  Conformer: ConformerSection,
  Wave2Letter: Wave2LetterSection
}

export function getPreTrainedParamModifierComponent(
  name: PreTrainedModels,
  props: PreTrainedSectionProps
) {
  const Component = preTrained2FormSectionMapper[name];
  return (
    <Component 
      {...props} 
      className={cn(
        'flex flex-col gap-5 sm:gap-8',
        'w-[65%] sm:w-full sm:grid sm:grid-cols-2',
        props.className
      )}
    />
  )
}