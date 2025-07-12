import type { ComponentType, JSX, ReactElement } from "react"
import type { PipelineDL, UnifiedTransformers } from "~/types/pipelineDL"
import { ResizeSection } from "./TransformersParamFields/Resize/Resize.section"
import type { UseFormReturn } from "react-hook-form"
import { RandomCropSection } from "./TransformersParamFields/RandomCrop/RandomCrop.section"
import { RandomHorizontalFlipSection } from "./TransformersParamFields/RandomHorizontalFlip/RandomHorizontalFlip.section"
import { ColorJitterSection } from "./TransformersParamFields/ColorJitter/ColorJitter.section"
import { GrayscaleSection } from "./TransformersParamFields/Grayscale/Grayscale.section"
import { RandomAdjustSharpnessSection } from "./TransformersParamFields/RandomAdjustSharpness/RandomAdjustSharpness.section"
import { NormalizeSection } from "./TransformersParamFields/Normalize/Normalize.section"
import { ConvertImageDtypeSection } from "./TransformersParamFields/ConvertImageDtype/ConvertImageDtype.section"
import { ToTensorSection } from "./TransformersParamFields/ToTensor/ToTensor.section"
import { RandomErasingSection } from "./TransformersParamFields/RandomErasing/RandomErasing.section"
import { GaussianBlurSection } from "./TransformersParamFields/GaussianBlur/GaussianBlur.section"
import { RegexTokenizerSection } from "./TransformersParamFields/RegexTokenizer/RegexTokenizer.section"
import { SentencePieceTokenizerSection } from "./TransformersParamFields/SentencePieceTokenizer/SentencePieceTokenizer.section"
import { VocabTransformSection } from "./TransformersParamFields/VocabTransform/VocabTransform.section"
import { TruncateSection } from "./TransformersParamFields/Truncate/Truncate.section"
import { PadTransformSection } from "./TransformersParamFields/PadTransform/PadTransform.section"
import { AddTokenSection } from "./TransformersParamFields/AddToken/AddToken.section"
import { BERTTokenizerSection } from "./TransformersParamFields/BERTTokenizer/BERTTokenizer.section"
import { LabelToIndexSection } from "./TransformersParamFields/LabelToIndex/LabelToIndex.section"
import { SpeedSection } from "./TransformersParamFields/Speed/Speed.section"
import { AmplitudeToDBSection } from "./TransformersParamFields/AmplitudeToDB/AmplitudeToDB.section"
import { ResampleSection } from "./TransformersParamFields/Resample/Resample.section"
import { FadeSection } from "./TransformersParamFields/Fade/Fade.section"
import { VolSection } from "./TransformersParamFields/Vol/Vol.section"
import { LoudnessSection } from "./TransformersParamFields/Loudness/Loudness.section"
import { SpectrogramSection } from "./TransformersParamFields/Spectrogram/Spectrogram.section"
import { MelSpectrogramSection } from "./TransformersParamFields/MelSpectrogram/MelSpectrogram.section"
import { MFCCSection } from "./TransformersParamFields/MFCC/MFCC.section"
import { TimeStrechSection } from "./TransformersParamFields/TimeStrech/TimeStrech.section"
import { FrequencyMaskingSection } from "./TransformersParamFields/FrequencyMasking/FrequencyMasking.section"
import { TimeMaskingSection } from "./TransformersParamFields/TimeMasking/TimeMasking.section"

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

export function getTransformerParamModifierComponent(
  transformerType: UnifiedTransformers,
  props: TransformerFieldProps,
) {
  const Component = transformer2FormMapper[transformerType]
  return <Component {...props} />
}
