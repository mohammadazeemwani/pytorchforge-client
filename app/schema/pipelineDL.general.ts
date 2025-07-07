import { objectKeys } from "ts-extras"
import * as z from "zod/v4"

export const Interpolation = z.enum([
  "nearest",
  "nearest_exact",
  "bilinear",
  "bicubic",
])
export type InterpolationType = z.infer<typeof Interpolation>

export const TensorD = z.enum(["float32", "float64", "int32", "int64"]) // Example
export type TensorDType = z.infer<typeof TensorD>

export const dataFormatPickerSchema = z.object({
  type: z.enum(["file", "folder"]).default('file'),
  path: z.string().default('')
}).default({
  type: 'file',
  path: ''
})

export const pipelineDLCustomModelsSchema = z.object({
  Linear: z.object({
    in_features: z.array(z.number()),
    out_features: z.array(z.number()),
    bias: z.boolean().optional(),
  }),

  Bilinear: z.object({
    in1_features: z.array(z.number()),
    in2_features: z.array(z.number()),
    out_features: z.array(z.number()),
    bias: z.boolean().optional(),
  }),

  Conv1d: z.object({
    in_channels: z.array(z.number()),
    out_channels: z.array(z.number()),
    kernel_size: z.array(z.number()),
    stride: z.number().optional(),
    padding: z.number().optional(),
    dilation: z.number().optional(),
    groups: z.number().optional(),
    bias: z.boolean().optional(),
    padding_mode: z.string().optional(),
  }),

  Conv2d: z.object({
    in_channels: z.array(z.number()),
    out_channels: z.array(z.number()),
    kernel_size: z.array(z.number()),
    stride: z.number(),
    padding: z.number().optional(),
    dilation: z.number().optional(),
    groups: z.number().optional(),
    bias: z.boolean().optional(),
    padding_mode: z.string().optional(),
  }),

  Conv3d: z.object({
    in_channels: z.array(z.number()),
    out_channels: z.array(z.number()),
    kernel_size: z.array(z.number()),
    stride: z.number().optional(),
    padding: z.number().optional(),
    dilation: z.number().optional(),
    groups: z.number().optional(),
    bias: z.boolean().optional(),
    padding_mode: z.string().optional(),
  }),

  ConvTranspose1d: z.object({
    in_channels: z.array(z.number()),
    out_channels: z.array(z.number()),
    kernel_size: z.array(z.number()),
    stride: z.number().optional(),
    padding: z.number().optional(),
    output_padding: z.number().optional(),
    bias: z.boolean().optional(),
  }),

  ConvTranspose2d: z.object({
    in_channels: z.array(z.number()),
    out_channels: z.array(z.number()),
    kernel_size: z.array(z.number()),
    stride: z.number().optional(),
    padding: z.number().optional(),
    output_padding: z.number().optional(),
    bias: z.boolean().optional(),
  }),

  ConvTranspose3d: z.object({
    in_channels: z.array(z.number()),
    out_channels: z.array(z.number()),
    kernel_size: z.array(z.number()),
    stride: z.number().optional(),
    padding: z.number().optional(),
    output_padding: z.number().optional(),
    bias: z.boolean().optional(),
  }),

  MaxPool1d: z.object({
    kernel_size: z.array(z.number()),
    stride: z.number().optional(),
    padding: z.number().optional(),
    dilation: z.number().optional(),
    ceil_mode: z.boolean().optional(),
  }),

  MaxPool2d: z.object({
    kernel_size: z.array(z.number()),
    stride: z.number().optional(),
    padding: z.number().optional(),
    dilation: z.number().optional(),
    ceil_mode: z.boolean().optional(),
  }),

  MaxPool3d: z.object({
    kernel_size: z.array(z.number()),
    stride: z.number().optional(),
    padding: z.number().optional(),
    dilation: z.number().optional(),
    ceil_mode: z.boolean().optional(),
  }),

  AvgPool1d: z.object({
    kernel_size: z.array(z.number()),
    stride: z.number().optional(),
    padding: z.number().optional(),
    dilation: z.number().optional(),
    ceil_mode: z.boolean().optional(),
    count_include_pad: z.boolean().optional(),
  }),

  AvgPool2d: z.object({
    kernel_size: z.array(z.number()),
    stride: z.number().optional(),
    padding: z.number().optional(),
    dilation: z.number().optional(),
    ceil_mode: z.boolean().optional(),
    count_include_pad: z.boolean().optional(),
  }),

  AvgPool3d: z.object({
    kernel_size: z.array(z.number()),
    stride: z.number().optional(),
    padding: z.number().optional(),
    dilation: z.number().optional(),
    ceil_mode: z.boolean().optional(),
    count_include_pad: z.boolean().optional(),
  }),

  BatchNorm1d: z.object({
    num_features: z.number(),
    eps: z.number().optional(),
    momentum: z.number().optional(),
    affine: z.boolean().optional(),
    track_running_stats: z.boolean().optional(),
  }),

  BatchNorm2d: z.object({
    num_features: z.number(),
    eps: z.number().optional(),
    momentum: z.number().optional(),
    affine: z.boolean().optional(),
    track_running_stats: z.boolean().optional(),
  }),

  BatchNorm3d: z.object({
    num_features: z.number(),
    eps: z.number().optional(),
    momentum: z.number().optional(),
    affine: z.boolean().optional(),
    track_running_stats: z.boolean().optional(),
  }),

  LayerNorm: z.object({
    normalized_shape: z.array(z.number()),
    eps: z.number().optional(),
    elementwise_affine: z.boolean().optional(),
  }),

  Transformer: z.object({
    d_model: z.number().optional(),
    nhead: z.number().optional(),
    num_encoder_layers: z.number().optional(),
    num_decoder_layers: z.number().optional(),
    dim_feedforward: z.number().optional(),
    dropout: z.number().optional(),
    activation: z.string().optional(),
  }),

  MultiheadAttention: z.object({
    embed_dim: z.number(),
    num_heads: z.number(),
    dropout: z.number().optional(),
    bias: z.boolean().optional(),
    add_bias_kv: z.boolean().optional(),
  }),

  Dropout: z.object({
    p: z.number(),
    inplace: z.boolean().optional(),
  }),

  Dropout1d: z.object({
    p: z.number(),
    inplace: z.boolean().optional(),
  }),

  Dropout2d: z.object({
    p: z.number(),
    inplace: z.boolean().optional(),
  }),

  Dropout3d: z.object({
    p: z.number(),
    inplace: z.boolean().optional(),
  }),

  Embedding: z.object({
    num_embeddings: z.number(),
    embedding_dimx: z.number(),
    padding_idx: z.number().optional(),
    max_norm: z.number().optional(),
    sparse: z.boolean().optional(),
  }),

  PixelShuffle: z.object({
    upscale_factor: z.number(),
  }),

  Upsample: z.object({
    size: z.number(),
    scale_factor: z.number().optional(),
    mode: Interpolation.optional(),
  }),

  LSTM: z.object({
    input_size: z.array(z.number()),
    hidden_size: z.array(z.number()),
    num_layers: z.number().optional(),
    batch_first: z.boolean().optional(),
    bidirectional: z.boolean().optional(),
  }),

  Flatten: z.object({
    start_dim: z.number(),
    end_dim: z.number(),
  }),

  Unfold: z.object({
    kernel_size: z.number(),
    stride: z.number().optional(),
    padding: z.number().optional(),
    dilation: z.number().optional(),
  }),
})
export const customModels = objectKeys(pipelineDLCustomModelsSchema)

const ReductionSchema = z.enum(["None", "Mean", "Sum"])
export const pipelineDLLossesSchema = z.object({
  CrossEntropyLoss: z.object({
    weight: z.array(z.number()).optional(),
    size_average: z.boolean().optional(),
    ignore_index: z.number().optional(),
    reduce: z.boolean().optional(),
    reduction: ReductionSchema.optional(),
    label_smoothing: z.number().optional(),
  }).optional(),

  BCELoss: z.object({
    weight: z.array(z.number()).optional(),
    size_average: z.boolean().optional(),
    reduce: z.boolean().optional(),
    reduction: ReductionSchema.optional(),
  }).optional(),

  BCEWithLogitsLoss: z.object({
    weight: z.array(z.number()).optional(),
    size_average: z.boolean().optional(),
    reduce: z.boolean().optional(),
    reduction: ReductionSchema.optional(),
    pos_weight: z.array(z.number()).optional(),
  }).optional(),

  MSELoss: z.object({
    size_average: z.boolean().optional(),
    reduce: z.boolean().optional(),
    reduction: ReductionSchema.optional(),
  }).optional(),

  L1Loss: z.object({
    size_average: z.boolean().optional(),
    reduce: z.boolean().optional(),
    reduction: ReductionSchema.optional(),
  }).optional(),
}).default({})

export const pipelineDLOptimizersSchema = z.object({
  Adam: z.object({
    lr: z.number().optional(),
    betas: z.array(z.number()).optional(),
    eps: z.number().optional(),
    weight_decay: z.number().optional(),
    amsgrad: z.boolean().optional(),
  }).optional(),

  SDG: z.object({
    lr: z.number().optional(),
    momentum: z.number().optional(),
    weight_decay: z.number().optional(),
    dampening: z.number().optional(),
    nesterov: z.number().optional(),
  }).optional(),

  RMSprop: z.object({
    lr: z.number().optional(),
    alpha: z.number().optional(),
    eps: z.number().optional(),
    weight_decay: z.number().optional(),
    momentum: z.number().optional(),
    centered: z.boolean().optional(),
  }).optional(),

  Adagrad: z.object({
    lr: z.number().optional(),
    lr_decay: z.number().optional(),
    weighti_decay: z.number().optional(),
    initial_accumulator: z.number().optional(),
  }).optional(),

  NAdam: z.object({
    lr: z.number().optional(),
    betas: z.number().optional(),
    eps: z.number().optional(),
    weight_decay: z.number().optional(),
  }).optional(),
}).default({})

/**
 * They don't have types.
 * Infact it will just be select options (multi select).
 * Or in other words. the state.monitoring will be an array ~ <Set particularly> that can contain any of these values.
 *
 * - && This is not monitors (is something diff.) > it is monitoring
 * */
export const pipelineDLMonitoringSchema = z.array(
  z.enum([
    "use_tensorboard",
    "use_wandb",
    "use_mlflow",
    "resource_alerts",
    "threshold_alerts",
  ])
).default([])

const TaskSchema = z.enum(["binary", "multiclass", "multilabel"])
const AverageSchema = z.enum(["micro", "macro", "weighted", "none"])
export const pipelineDLMetricsSchema = z.object({
  Accuracy: z.object({
    task: TaskSchema,
    num_classes: z.number().optional(),
    threshold: z.number().optional(),
    top_k: z.number().optional(),
    average: AverageSchema.optional(),
  }).optional(),

  F1Score: z.object({
    task: TaskSchema,
    num_classes: z.number().optional(),
    threshold: z.number().optional(),
    top_k: z.number().optional(),
    average: AverageSchema.optional(),
  }).optional(),

  Recall: z.object({
    task: TaskSchema,
    num_classes: z.number().optional(),
    threshold: z.number().optional(),
    top_k: z.number().optional(),
    average: AverageSchema.optional(),
  }).optional(),

  MeanAbsoluteError: z.object({
    num_outputs: z.number().optional(),
  }).optional(),
}).default({})

export const trainingHyperParametersSchema = z.object({
  batch_size: z.number().default(32),
  learning_rate: z.number().default(0.1),
  epochs: z.number().default(10),
  weight_decay: z.number().default(0)
}).default({
  batch_size: 32,
  learning_rate: 0.1,
  epochs: 10,
  weight_decay: 0
})

const ModeSchema = z.enum(["min", "max"])
const MonitorSchema = z.enum(["val_loss"])
export const pipelineDLEarlyStoppingSchema = z.object({
  patience: z.number().default(5),
  min_delta: z.number().optional(),
  mode: ModeSchema.optional(),
  monitor: MonitorSchema.optional(),
  verbose: z.boolean().optional(),
  restore_best_weights: z.boolean().optional(),
}).default({
  patience: 5
})

export const pipelineDLLRSchedularSchema = z.object({
  ReduceLROnPlateau: z.object({
    patience: z.number(),
    factor: z.number().optional(),
    mode: ModeSchema.optional(),
    threshold: z.number().optional(),
  }),
}).default({
  ReduceLROnPlateau: { patience: 10 }
})
