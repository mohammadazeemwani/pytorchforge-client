import type { DeepPartial } from "react-hook-form"
import {
  pipelineDLMainTaskDiscriminatedSchema,
  pipelineDLSchema,
} from "~/schema/pipelineDL"
import type { MainTask, PipelineDL } from "~/types/pipelineDL"
import { Interpolation, TensorD } from "~/schema/pipelineDL.general"
import merge from "deepmerge"
import { ZodBoolean, ZodEnum } from "zod/v4"

/**
 *
 * @param mainTask to get the default values for..
 */
export function getDefaultPipelineDLSchema(
  mainTask: MainTask,
): DeepPartial<PipelineDL> {
  /**
   * This is the minimal stuff that is required to get the default object for given maintask
   */
  let discriminatedOnMainTask: DeepPartial<PipelineDL> = {}
  switch (mainTask) {
    case "image":
      discriminatedOnMainTask = {
        mainTask: "image",
        subTask: "classification",
        dataFormat: "png",
        transformers: ['ToTensor']
      }
      break
    case "text":
      discriminatedOnMainTask = {
        mainTask: "text",
        subTask: "classification",
        dataFormat: "csv",
        transformers: ['ToTensor']
      }
      break
    case "audio":
      discriminatedOnMainTask = {
        mainTask: "audio",
        subTask: "classification",
        dataFormat: "mp3",
        transformers: ['ToTensor']
      }
      break
  }
  const commons: DeepPartial<PipelineDL> = {
    trainingHyperParameters: {
      batch_size: 32,
      learning_rate: 0.1,
      epochs: 10,
      weight_decay: 0,
    },
    earlyStopping: {
      patience: 5,
    },
    transformersData: {
      Resize: {
        size: [224, 224],
        interpolation: "bilinear",
      },
      RandomCrop: {
        size: [224, 224],
      },
      RandomHorizontalFlip: {
        p: 0.5,
      },
      ColorJitter: {
        brightness: 0.4,
        contrast: 0.4,
        saturation: 0.4,
        hue: 0.1,
      },
      Grayscale: {
        num_output_channels: 1,
      },
      RandomAdjustSharpness: {
        sharpness_factor: 2,
        p: 0.5,
      },
      Normalize: {
        mean: [0.5],
        std: [0.5],
      },
      ConvertImageDtype: {
        dtype: "float32",
      },
      ToTensor: {
        dtype: "float32",
      },
      RandomErasing: {
        p: 0.5,
        scale: [0.02, 0.33],
        ratio: [0.3, 3.3],
        value: 0,
      },
      GaussianBlur: {
        kernel_size: 3,
        sigma: [0.1, 2.0],
      },
      RegexTokenizer: {
        patterns_list: ["w+"],
      },
      Truncate: {
        max_seq_len: 128,
      },
      PadTransform: {
        max_length: 128,
        pad_value: 0,
      },
      AddToken: {
        token: ["<CLS>"],
        begin: true,
      },
      BERTTokenizer: {
        tokenizer: "facebook/bart-base",
      },
      Speed: {
        orig_freq: 16000,
        factor: 1.0,
      },
      AmplitudeToDB: {
        stype: "power",
      },
      Resample: {
        orig_freq: 16000,
        new_freq: 16000,
        resampling_method: "sinc_interp_hann",
        lowpass_filter_width: 6,
        rolloff: 0.99,
        dtype: "float32",
      },
      Fade: {
        fade_in_len: 0,
        fade_out_len: 0,
      },
      Vol: {
        gain: 1.0,
        gain_type: "amplitude",
      },
      Loudness: {
        sample_rate: 16000,
      },
      Spectrogram: {
        pad_mode: "reflect",
        onesided: true,
      },
      MelSpectrogram: {
        sample_rate: 16000,
        n_fft: 400,
        n_mels: 120,
        f_min: 0,
      },
      MFCC: {
        sample_rate: 16000,
        n_mfcc: 40,
        dct_type: 2,
        log_mels: false,
      },
      TimeStrech: {
        n_freq: 201,
      },
      FrequencyMasking: {
        freq_mask_param: 30,
      },
      TimeMasking: {
        time_mask_param: 40,
      },
    },
  }

  return merge.all([discriminatedOnMainTask, commons])
}

export function getAllowedSubtasks(mainTask: MainTask) {
  const variant = pipelineDLMainTaskDiscriminatedSchema.options.find((opt) => {
    return opt.shape.mainTask.value === mainTask
  })

  // it is wrapped in inner
  const subTaskSchema = variant!.shape.subTask

  // unwrapping the default <Remb. it>
  const inner = subTaskSchema.def.innerType

  return inner.options
}

export function getAllowedDataFormats(mainTask: MainTask) {
  const variant = pipelineDLMainTaskDiscriminatedSchema.options.find((opt) => {
    return opt.shape.mainTask.value === mainTask
  })
  const dataFormatSchema = variant!.shape.dataFormat
  const inner = dataFormatSchema.def.innerType
  return inner.options
}

export function getAllowedTransformers(mainTask: MainTask) {
  const variant = pipelineDLMainTaskDiscriminatedSchema.options.find((opt) => {
    return opt.shape.mainTask.value === mainTask
  })
  const transformersSchema = variant!.shape.transformers
  const inner = transformersSchema.def.innerType
  return inner.def.element.options
}

export function getAllowedInterpolation() {
  // Derived way [will come handy]
  /**
  const inner = pipelineDLSchema.def.left.shape.transformersData.shape.Resize.shape.interpolation.def.innerType
  const values = inner.unwrap().options
  return values;
  */

  // direct way
  return Interpolation.options
}

export function getAllowedTensorD() {
  return TensorD.options
}

export function getAllowedAmplitudeToDB() {
  const inner =
    pipelineDLSchema.def.left.shape.transformersData.shape.AmplitudeToDB.shape
      .stype
  const values = inner.options
  return values
}

export function getAllowedResamplingMethod() {
  const inner =
    pipelineDLSchema.def.left.shape.transformersData.shape.Resample.shape
      .resampling_method
  const values = inner.options
  return values
}

export function getAllowedFadeShape() {
  const inner =
    pipelineDLSchema.def.left.shape.transformersData.shape.Fade.shape.fade_shape
  const values = inner.options
  return values
}

export function getAllowedGainType() {
  const inner =
    pipelineDLSchema.def.left.shape.transformersData.shape.Vol.shape.gain_type
  const values = inner.options
  return values
}

export function getAllowedNormalized() {
  // NOTE: DO not remove this, logic
  // const inner =
  //   pipelineDLSchema.def.left.shape.transformersData.shape.Spectogram.shape.normalized
  // const values = inner.unwrap().options.flatMap(option => {
  //   if (option instanceof ZodEnum) {
  //     return option.options
  //   }
  //   if (option instanceof ZodBoolean) {
  //     return ['true', 'false'] as const;
  //   }

  //   return [];
  // })
  // return values

  const inner = pipelineDLSchema.def.left.shape.transformersData.shape.Spectrogram.shape.normalized
  const values = inner.unwrap().options
  return values;
}

export function getAllowedPadMode() {
  const inner =
    pipelineDLSchema.def.left.shape.transformersData.shape.Spectrogram.shape.pad_mode
  const values = inner.unwrap().options
  return values
}
