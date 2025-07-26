import type { ComponentType } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { PipelineDL, PreTrainedModels } from "~/types/pipelineDL";
import { ResNetSection } from "./PreTrainedModelParamSections/ResNet/ResNet.section";
import { cn } from "~/utils/general";
import { EfficientNetSection } from "./PreTrainedModelParamSections/EfficientNet/EfficientNet.section";
import { VisionTransformerSection } from "./PreTrainedModelParamSections/VisionTransformer/VisionTransformer.section";
import { FasterRCNNSection } from "./PreTrainedModelParamSections/FasterRCNN/FasterRCNN.section";
import { MaskRCNNSection } from "./PreTrainedModelParamSections/MaskRCNN/MaskRCNN.section";
import { DeepLabV3Section } from "./PreTrainedModelParamSections/DeepLabV3/DeepLabV3.section";
import { GloVeSection } from "./PreTrainedModelParamSections/GloVe/GloVe.section";
import { FastTextSection } from "./PreTrainedModelParamSections/FastText/FastText.section";
import { TransformerSection } from "./PreTrainedModelParamSections/Transformer/Transformer.section";
import { ConformerSection } from "./PreTrainedModelParamSections/Conformer/Conformer.section";
import { Wave2LetterSection } from "./PreTrainedModelParamSections/Wave2Letter/Wave2Letter.section";
import { WaveRNNSection } from "./PreTrainedModelParamSections/WaveRNN/WaveRNN.section";

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
  Wave2Letter: Wave2LetterSection,
  WaveRNN: WaveRNNSection
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
        "w-[90%] sm:w-full sm:grid sm:grid-cols-2 items-start",
        props.className
      )}
    />
  )
}