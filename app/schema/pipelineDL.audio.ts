import * as z from "zod/v4"
import {
  TensorD,
  customModels,
} from "./pipelineDL.general"
import { objectKeys } from "ts-extras"

export const audioTransformersSchema = z.object({
  Speed: z.object({
    orig_freq: z.number(),
    factor: z.number(),
  }),
  AmplitudeToDB: z.object({
    stype: z.enum(["power", "magnitude"]),
    top_db: z.number().optional(),
  }),
  Resample: z.object({
    orig_freq: z.number(),
    new_freq: z.number(),
    resampling_method: z
      .enum(["sinc_interp_hann", "sinc_interp_kaiser"]),
    lowpass_filter_width: z.number(),
    rolloff: z.number(),
    beta: z.number().optional(),
    dtype: TensorD,
  }),
  Fade: z.object({
    fade_in_len: z.number().optional(),
    fade_out_len: z.number().optional(),
    fade_shape: z.enum(["half_sine", "linear", "logarithmic", "exponential"]),
  }),
  Vol: z.object({
    gain: z.number(),
    gain_type: z.enum(["amplitude", "power", "db"]),
  }),
  Loudness: z.object({
    sample_rate: z.number(),
  }),
  Spectrogram: z.object({
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
  }),
  MelSpectrogram: z.object({
    sample_rate: z.number().optional(),
    n_fft: z.number().optional(),
    n_mels: z.number().optional(),
    f_min: z.number().optional(),
    f_max: z.number().optional(),
    hop_length: z.number().optional(),
  }),
  MFCC: z.object({
    sample_rate: z.number().optional(),
    n_mfcc: z.number().optional(),
    dct_type: z.number().optional(),
    log_mels: z.boolean().optional(),
  }),
  TimeStrech: z.object({
    n_freq: z.number(),
    fixed_rate: z.number().optional(),
  }),
  FrequencyMasking: z.object({
    freq_mask_param: z.number(),
    iid_masks: z.boolean().optional(),
  }),
  TimeMasking: z.object({
    time_mask_param: z.number(),
    iid_masks: z.boolean().optional(),
    p: z.number().optional(),
  }),
  ToTensor: z.object({
    dtype: TensorD,
  })
})

export const audioPretrainedModelsSchema = z.object({
  Conformer: z.object({
    input_dim: z.number().default(80),
    num_heads: z.number().default(4),
    ffn_dim: z.number().default(256),
    num_layers: z.number().default(6),
    depthwise_conv_kernel_size: z.number().default(31),
    dropout: z.number().optional().default(0.0),
    use_group_norm: z.boolean().optional().default(false),
    convolution_first: z.boolean().optional().default(false),
  }),
  Wave2Letter: z.object({
    num_classes: z.number().default(40),
    input_type: z.string().optional().default("waveform"),
    num_features: z.number().optional().default(1),
  }),
  WaveRNN: z.object({
    upsample_scales: z.array(z.number()).default([5, 5, 8]),
    n_classes: z.number().default(256),
    hop_length: z.number().default(200),
    n_res_block: z.number().optional().default(10),
    n_rnn: z.number().optional().default(512),
    n_fc: z.number().optional().default(512),
    kernel_size: z.number().optional().default(5),
    n_freq: z.number().optional().default(128),
    n_hidden: z.number().optional().default(128),
    n_output: z.number().optional().default(128),
  }),
})

/** gives an array of transformers that can be used when mainTask = 'audio' */
export const audioTransformers = objectKeys(audioTransformersSchema.shape)

/** gives an array of pretrainedModels that can be used when mainTask = 'audio' */
export const audioPretrainedModels = objectKeys(audioPretrainedModelsSchema.shape)

export const pipelineDLAudioSchema = z.object({
  mainTask: z.literal("audio"),
  subTask: z
    .enum(["classification", "recognition", "conversion", "generation"])
    .default("classification"),
  dataFormat: z
    .enum(["wav", "mp3", "flac", "pytorch-tensor", "pickle"])
    .default("mp3"),
  transformers: z.array(z.enum(audioTransformers)).default([]),
  pretrainedModels: z.array(z.enum(audioPretrainedModels)).default([]),
  customModels: z.array(z.enum(customModels)).default([]),
})
