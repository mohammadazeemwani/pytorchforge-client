import React from "react"
import type { ComponentType } from "react"
import type { PipelineDL, CustomModels } from "~/types/pipelineDL"
import type { UseFormReturn } from "react-hook-form"
import { LinearSection } from "./CustomModelsParamSections/Linear/Linear.section"
import { BilinearSection } from "./CustomModelsParamSections/Bilinear/Bilinear.section"
import { Conv1dSection } from "./CustomModelsParamSections/Conv1d/Conv1d.section"
import { Conv2dSection } from "./CustomModelsParamSections/Conv2d/Conv2d.section"
import { Conv3dSection } from "./CustomModelsParamSections/Conv3d/Conv3d.section"
import { ConvTranspose1dSection } from "./CustomModelsParamSections/ConvTranspose1d/ConvTranspose1d.section"
import { ConvTranspose2dSection } from "./CustomModelsParamSections/ConvTranspose2d/ConvTranspose2d.section"
import { ConvTranspose3dSection } from "./CustomModelsParamSections/ConvTranspose3d/ConvTranspose3d.section"
import { MaxPool1dSection } from "./CustomModelsParamSections/MaxPool1d/MaxPool1d.section"
import { MaxPool2dSection } from "./CustomModelsParamSections/MaxPool2d/MaxPool2d.section"
import { MaxPool3dSection } from "./CustomModelsParamSections/MaxPool3d/MaxPool3d.section"
import { AvgPool1dSection } from "./CustomModelsParamSections/AvgPool1d/AvgPool1d.section"
import { AvgPool2dSection } from "./CustomModelsParamSections/AvgPool2d/AvgPool2d.section"
import { AvgPool3dSection } from "./CustomModelsParamSections/AvgPool3d/AvgPool3d.section"
import { BatchNorm1dSection } from "./CustomModelsParamSections/BatchNorm1d/BatchNorm1d.section"
import { BatchNorm2dSection } from "./CustomModelsParamSections/BatchNorm2d/BatchNorm2d.section"
import { BatchNorm3dSection } from "./CustomModelsParamSections/BatchNorm3d/BatchNorm3d.section"
import { LayerNormSection } from "./CustomModelsParamSections/LayerNorm/LayerNorm.section"
import { TransformerSection } from "./CustomModelsParamSections/Transformer/Transformer.section"
import { MultiheadAttentionSection } from "./CustomModelsParamSections/MultiheadAttention/MultiheadAttention.section"
import { DropoutSection } from "./CustomModelsParamSections/Dropout/Dropout.section"
import { Dropout1dSection } from "./CustomModelsParamSections/Dropout1d/Dropout1d.section"
import { Dropout2dSection } from "./CustomModelsParamSections/Dropout2d/Dropout2d.section"
import { Dropout3dSection } from "./CustomModelsParamSections/Dropout3d/Dropout3d.section"
import { EmbeddingSection } from "./CustomModelsParamSections/Embedding/Embedding.section"
import { PixelShuffleSection } from "./CustomModelsParamSections/PixelShuffle/PixelShuffle.section"
import { UpsampleSection } from "./CustomModelsParamSections/Upsample/Upsample.section"
import { LSTMSection } from "./CustomModelsParamSections/LSTM/LSTM.section"
import { FlattenSection } from "./CustomModelsParamSections/Flatten/Flatten.section"
import { UnfoldSection } from "./CustomModelsParamSections/Unfold/Unfold.section"

export type CustomModelsFieldProps = {
  form: UseFormReturn<PipelineDL>,
  index: number
} & React.ComponentProps<"div">

const customModel2SectionMapper: Record<
  CustomModels['name'],
  ComponentType<CustomModelsFieldProps>
> = {
  Linear: LinearSection,
  Bilinear: BilinearSection,
  Conv1d: Conv1dSection,
  Conv2d: Conv2dSection,
  Conv3d: Conv3dSection,
  ConvTranspose1d: ConvTranspose1dSection,
  ConvTranspose2d: ConvTranspose2dSection,
  ConvTranspose3d: ConvTranspose3dSection,
  MaxPool1d: MaxPool1dSection,
  MaxPool2d: MaxPool2dSection,
  MaxPool3d: MaxPool3dSection,
  AvgPool1d: AvgPool1dSection,
  AvgPool2d: AvgPool2dSection,
  AvgPool3d: AvgPool3dSection,
  BatchNorm1d: BatchNorm1dSection,
  BatchNorm2d: BatchNorm2dSection,
  BatchNorm3d: BatchNorm3dSection,
  LayerNorm: LayerNormSection,
  Transformer: TransformerSection,
  MultiheadAttention: MultiheadAttentionSection,
  Dropout: DropoutSection,
  Dropout1d: Dropout1dSection,
  Dropout2d: Dropout2dSection,
  Dropout3d: Dropout3dSection,
  Embedding: EmbeddingSection,
  PixelShuffle: PixelShuffleSection,
  Upsample: UpsampleSection,
  LSTM: LSTMSection,
  Flatten: FlattenSection,
  Unfold: UnfoldSection
}

export function CustomModelParamModifierComponent({
  modelName,
  props,
}: {
  modelName: CustomModels['name'];
  props: CustomModelsFieldProps;
}) {
  const Component = customModel2SectionMapper[modelName];
  return <Component {...props} />;
}
