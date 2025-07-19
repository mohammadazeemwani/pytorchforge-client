import type { DeepPartial } from "react-hook-form"
import {
  pipelineDLMainTaskDiscriminatedSchema,
  pipelineDLSchema,
} from "~/schema/pipelineDL"
import type { MainTask, PipelineDL, SubTasks, SubTasksDiscriminated } from "~/types/pipelineDL"
import { Interpolation, TensorD } from "~/schema/pipelineDL.general"
import merge from "deepmerge"
import { ZodBoolean, ZodEnum } from "zod/v4"
import { defaultDataLoadingCode, type defaultDataLoadingCode_t } from "~/constants/pipelineDLDataLoading"

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
    dataLoading: getDefaultDataLoadingCode(discriminatedOnMainTask.mainTask!, discriminatedOnMainTask.subTask!),
    usePreTrained: true,
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
        padding: []
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
        fade_shape: 'half_sine'
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
        center: true
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
    pretrainedModelsData: {
      ResNet: {
        pretrained: true,
        num_classes: 1000
      },
      EfficientNet: {
        width_mult: 1.0,
        depth_mult: 1.0,
        dropout: 0.2
      },
      VisionTransformer: {
        image_size: 224,
        patch_size: 16,
        num_layers: 12,
        num_heads: 12,
        hidden_dim: 768
      },
      FasterRCNN: {
        backbone: 'resnet50',
        num_classes: 91,
        min_size: 800,
        max_size: 1333
      },
      MaskRCNN: {
        backbone: 'resnet50',
        num_classes: 91  
      },
      DeepLabV3: {
        weights: 'resnet50',
        num_classes: 91  
      },

      // text
      GloVe: {
        dim: 300,
        name: '6B'
      },
      FastText: {
        language: 'en'
      },
      Transformer: {
        d_model: 512,
        nhead: 8,
        num_encoder_layers: 6,
        num_decoder_layers: 6,
        dim_feedforward: 2048,
        dropout: 0.1,
        activation: "<function relu>",
        layer_norm_eps: 1e-5,
        batch_first: false,
        norm_first: true,
        dtype: 'float32'
      },

      // audio
      Conformer: {
        input_dim: 80,
        num_heads: 4,
        ffn_dim: 256,
        num_layers: 6,
        depthwise_conv_kernel_size: 31,
        dropout: 0.0,
        use_group_norm: false,
        convolution_first: false
      },
      Wave2Letter: {
        num_classes: 40,
        input_type: 'waveform',
        num_features: 1
      },
      WaveRNN: {
        upsample_scales: [5, 5, 8],
        n_classes: 256,
        hop_length: 200,
        n_res_block: 10,
        n_rnn: 512,
        n_fc: 512,
        kernel_size: 5,
        n_freq: 128,
        n_hidden: 128,
        n_output: 128
      }
    }
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
  const inner = subTaskSchema

  return inner.options
}

export function getAllowedDataFormats(mainTask: MainTask) {
  const variant = pipelineDLMainTaskDiscriminatedSchema.options.find((opt) => {
    return opt.shape.mainTask.value === mainTask
  })
  const dataFormatSchema = variant!.shape.dataFormat
  const inner = dataFormatSchema
  return inner.options
}

export function getAllowedTransformers(mainTask: MainTask) {
  const variant = pipelineDLMainTaskDiscriminatedSchema.options.find((opt) => {
    return opt.shape.mainTask.value === mainTask
  })
  const transformersSchema = variant!.shape.transformers
  const inner = transformersSchema.def
  return inner.element.options
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
    pipelineDLSchema.def.left.shape.transformersData.shape.AmplitudeToDB.unwrap()
    const values = inner.shape.stype.options
    return values
}

export function getAllowedResamplingMethod() {
  const inner =
    pipelineDLSchema.def.left.shape.transformersData.shape.Resample.unwrap()
  const values = inner.shape.resampling_method.options
  return values
}

export function getAllowedFadeShape() {
  const inner =
    pipelineDLSchema.def.left.shape.transformersData.shape.Fade.unwrap()
  const values = inner.shape.fade_shape.options
  return values
}

export function getAllowedGainType() {
  const inner =
    pipelineDLSchema.def.left.shape.transformersData.shape.Vol.unwrap()
  const values = inner.shape.gain_type.options
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

  const inner = pipelineDLSchema.def.left.shape.transformersData.shape.Spectrogram.unwrap()
  const values = inner.shape.normalized.unwrap().options
  return values;
}

export function getAllowedPadMode() {
  const inner =
    pipelineDLSchema.def.left.shape.transformersData.shape.Spectrogram.unwrap()
  const values = inner.shape.pad_mode.unwrap().options
  return values
}


export function getDefaultDataLoadingCode(
  mainTask: MainTask,
  subTask: SubTasks
) {
  return defaultDataLoadingCode[mainTask][subTask as keyof defaultDataLoadingCode_t[MainTask]];
}


export function getAllowedPreTrainedModel(mainTask: MainTask) {
  const variant = pipelineDLMainTaskDiscriminatedSchema.options.find((opt) => {
    return opt.shape.mainTask.value === mainTask
  })
  const preTrainedModelSchema = variant!.shape.pretrainedModel
  const values = preTrainedModelSchema.options
  return values
}

// doesn't depend on mainTask
export function getAllowedCustomModel() {
  const inner =
    pipelineDLSchema.def.left.shape.customModels
  const values = inner.unwrap().options
  return values
}