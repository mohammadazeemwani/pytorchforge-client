import * as z from "zod/v4"
import {
  TensorD,
} from "./pipelineDL.general"
import { objectKeys } from "ts-extras"

export const audioTransformersSchema = z.object({
  Speed: z
    .object({
      orig_freq: z.number(),
      factor: z.number(),
    })
    .optional(),
  AmplitudeToDB: z
    .object({
      stype: z.enum(["power", "magnitude"]),
      top_db: z.number().optional(),
    })
    .optional(),
  Resample: z
    .object({
      orig_freq: z.number(),
      new_freq: z.number(),
      resampling_method: z
        .enum(["sinc_interp_hann", "sinc_interp_kaiser"]),
      lowpass_filter_width: z.number(),
      rolloff: z.number(),
      beta: z.number().optional(),
      dtype: TensorD,
    })
    .optional(),
  Fade: z
    .object({
      fade_in_len: z.number().optional(),
      fade_out_len: z.number().optional(),
      fade_shape: z.enum(["half_sine", "linear", "logarithmic", "exponential"]),
    })
    .optional(),
  Vol: z
    .object({
      gain: z.number(),
      gain_type: z.enum(["amplitude", "power", "db"]),
    })
    .optional(),
  Loudness: z
    .object({
      sample_rate: z.number(),
    })
    .optional(),
  Spectrogram: z
    .object({
      n_fft: z.number().optional(),
      win_length: z.number().optional(),
      hop_length: z.number().optional(),
      pad: z.number().optional(),
      power: z.number().optional(),
      normalized: z
        .enum(["window", "frame-length"])
        .optional(),
      center: z.boolean(),
      pad_mode: z.enum(["reflect"]).optional(),
      onesided: z.boolean().optional(),
    })
    .optional(),
  MelSpectrogram: z
    .object({
      sample_rate: z.number().optional(),
      n_fft: z.number().optional(),
      n_mels: z.number().optional(),
      f_min: z.number().optional(),
      f_max: z.number().optional(),
      hop_length: z.number().optional(),
    })
    .optional(),
  MFCC: z
    .object({
      sample_rate: z.number().optional(),
      n_mfcc: z.number().optional(),
      dct_type: z.number().optional(),
      log_mels: z.boolean().optional(),
    })
    .optional(),
  TimeStrech: z
    .object({
      n_freq: z.number(),
      fixed_rate: z.number().optional(),
    })
    .optional(),
  FrequencyMasking: z
    .object({
      freq_mask_param: z.number(),
      iid_masks: z.boolean().optional(),
    })
    .optional(),
  TimeMasking: z
    .object({
      time_mask_param: z.number(),
      iid_masks: z.boolean().optional(),
      p: z.number().optional(),
    })
    .optional(),
  ToTensor: z
    .object({
      dtype: TensorD,
    })
    .optional(),
})

export const audioPretrainedModelsSchema = z.object({
  Conformer: z.object({
    input_dim: z.number(),
    num_heads: z.number(),
    ffn_dim: z.number(),
    num_layers: z.number(),
    depthwise_conv_kernel_size: z.number(),
    dropout: z.number().optional(),
    use_group_norm: z.boolean().optional(),
    convolution_first: z.boolean().optional(),
  }).optional(),
  Wave2Letter: z.object({
    num_classes: z.number(),
    input_type: z.string().optional(),
    num_features: z.number().optional(),
  }).optional(),
  WaveRNN: z.object({
    upsample_scales: z.array(z.number()),
    n_classes: z.number(),
    hop_length: z.number(),
    n_res_block: z.number().optional(),
    n_rnn: z.number().optional(),
    n_fc: z.number().optional(),
    kernel_size: z.number().optional(),
    n_freq: z.number().optional(),
    n_hidden: z.number().optional(),
    n_output: z.number().optional(),
  }).optional(),
})

/** gives an array of transformers that can be used when mainTask = 'audio' */
export const audioTransformers = objectKeys(audioTransformersSchema.shape)

/** gives an array of pretrainedModels that can be used when mainTask = 'audio' */
export const audioPretrainedModels = objectKeys(audioPretrainedModelsSchema.shape)

export const pipelineDLAudioSchema = z.object({
  mainTask: z.literal("audio"),
  subTask: z
    .enum(["classification", "recognition", "conversion", "generation"]),
  dataFormat: z
    .enum(["wav", "mp3", "flac", "pytorch-tensor", "pickle"]),
  transformers: z.array(z.enum(audioTransformers)),
  pretrainedModel: z.enum(audioPretrainedModels),
})
