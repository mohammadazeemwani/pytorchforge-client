import type { ComponentType, JSX, ReactElement } from "react"
import type { PipelineDL, UnifiedTransformers } from "~/types/pipelineDL"
import { ResizeSection } from "./TransformersParamSections/Resize/Resize.section"
import type { UseFormReturn } from "react-hook-form"
import { RandomCropSection } from "./TransformersParamSections/RandomCrop/RandomCrop.section"
import { RandomHorizontalFlipSection } from "./TransformersParamSections/RandomHorizontalFlip/RandomHorizontalFlip.section"
import { ColorJitterSection } from "./TransformersParamSections/ColorJitter/ColorJitter.section"
import { GrayscaleSection } from "./TransformersParamSections/Grayscale/Grayscale.section"
import { RandomAdjustSharpnessSection } from "./TransformersParamSections/RandomAdjustSharpness/RandomAdjustSharpness.section"
import { NormalizeSection } from "./TransformersParamSections/Normalize/Normalize.section"
import { ConvertImageDtypeSection } from "./TransformersParamSections/ConvertImageDtype/ConvertImageDtype.section"
import { ToTensorSection } from "./TransformersParamSections/ToTensor/ToTensor.section"
import { RandomErasingSection } from "./TransformersParamSections/RandomErasing/RandomErasing.section"
import { GaussianBlurSection } from "./TransformersParamSections/GaussianBlur/GaussianBlur.section"
import { RegexTokenizerSection } from "./TransformersParamSections/RegexTokenizer/RegexTokenizer.section"
import { SentencePieceTokenizerSection } from "./TransformersParamSections/SentencePieceTokenizer/SentencePieceTokenizer.section"
import { VocabTransformSection } from "./TransformersParamSections/VocabTransform/VocabTransform.section"
import { TruncateSection } from "./TransformersParamSections/Truncate/Truncate.section"
import { PadTransformSection } from "./TransformersParamSections/PadTransform/PadTransform.section"
import { AddTokenSection } from "./TransformersParamSections/AddToken/AddToken.section"
import { BERTTokenizerSection } from "./TransformersParamSections/BERTTokenizer/BERTTokenizer.section"
import { LabelToIndexSection } from "./TransformersParamSections/LabelToIndex/LabelToIndex.section"
import { SpeedSection } from "./TransformersParamSections/Speed/Speed.section"
import { AmplitudeToDBSection } from "./TransformersParamSections/AmplitudeToDB/AmplitudeToDB.section"
import { ResampleSection } from "./TransformersParamSections/Resample/Resample.section"
import { FadeSection } from "./TransformersParamSections/Fade/Fade.section"
import { VolSection } from "./TransformersParamSections/Vol/Vol.section"
import { LoudnessSection } from "./TransformersParamSections/Loudness/Loudness.section"
import { SpectrogramSection } from "./TransformersParamSections/Spectrogram/Spectrogram.section"
import { MelSpectrogramSection } from "./TransformersParamSections/MelSpectrogram/MelSpectrogram.section"
import { MFCCSection } from "./TransformersParamSections/MFCC/MFCC.section"
import { TimeStrechSection } from "./TransformersParamSections/TimeStrech/TimeStrech.section"
import { FrequencyMaskingSection } from "./TransformersParamSections/FrequencyMasking/FrequencyMasking.section"
import { TimeMaskingSection } from "./TransformersParamSections/TimeMasking/TimeMasking.section"

export type TransformerFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export const transformer2FormMapper: Record<
  UnifiedTransformers,
  ComponentType<TransformerFieldProps>
> = {
  //--------------IMAGE TRANSFORMERS---------------
  Resize: ResizeSection,
  RandomCrop: RandomCropSection,
  RandomHorizontalFlip: RandomHorizontalFlipSection,
  ColorJitter: ColorJitterSection,
  Grayscale: GrayscaleSection,
  RandomAdjustSharpness: RandomAdjustSharpnessSection,
  Normalize: NormalizeSection,
  ConvertImageDtype: ConvertImageDtypeSection,
  ToTensor: ToTensorSection,
  RandomErasing: RandomErasingSection,
  GaussianBlur: GaussianBlurSection,

  //--------------TEXT TRANSFORMERS---------------
  RegexTokenizer: RegexTokenizerSection,
  SentencePieceTokenizer: SentencePieceTokenizerSection,
  VocabTransform: VocabTransformSection,
  // ToTensor is same
  Truncate: TruncateSection,
  PadTransform: PadTransformSection,
  AddToken: AddTokenSection,
  BERTTokenizer: BERTTokenizerSection,
  LabelToIndex: LabelToIndexSection,

  //--------------AUDIO TRANSFORMERS---------------
  Speed: SpeedSection,
  AmplitudeToDB: AmplitudeToDBSection,
  Resample: ResampleSection,
  Fade: FadeSection,
  Vol: VolSection,
  Loudness: LoudnessSection,
  Spectrogram: SpectrogramSection,
  MelSpectrogram: MelSpectrogramSection,
  MFCC: MFCCSection,
  TimeStrech: TimeStrechSection,
  FrequencyMasking: FrequencyMaskingSection,
  TimeMasking: TimeMaskingSection,
}

export function TransformerParamModifierComponent({
  transformerName,
  props,
}: {
  transformerName: UnifiedTransformers,
  props: TransformerFieldProps,
}) {
  const Component = transformer2FormMapper[transformerName]
  return <Component {...props} />
}
