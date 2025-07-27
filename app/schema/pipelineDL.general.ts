import { objectKeys } from "ts-extras"
import * as z from "zod/v4"

export const Interpolation = z.enum([
  "nearest",
  "nearest_exact",
  "bilinear",
  "bicubic",
])
export type InterpolationType = z.infer<typeof Interpolation>

export const arrayNumberSchema = z
  .string()
  .refine((val) => {
    const numbers = val
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean)
      .map(Number)

    return numbers.every((n) => !isNaN(n))
  }, {
    message: "Input must be comma-separated numbers like '123, 123'",
  })


export const TensorD = z.enum(["float32", "float64", "int32", "int64"]) // Example
export type TensorDType = z.infer<typeof TensorD>

export const dataSourceSchema = z.object({
  type: z.enum(['file', 'folder']),
  value: z.string()
}, {
  error: 'Select a file or folder as source'
})

export const dataLoadingSchema = z.string()
export const usePreTrainedSchema = z.boolean()
export const customModelsSchema = z.array(z.union([
  z.object({
    name: z.literal('Linear'),
    props: z.object({
      in_features: z.array(z.number()).nonempty('value can\'t be empty'),
      out_features: z.array(z.number()).nonempty('value can\'t be empty'),
      bias: z.boolean().optional(),
    })
  }),

  z.object({
    name: z.literal('Bilinear'),
    props: z.object({
      in1_features: z.array(z.number()).nonempty('value can\'t be empty'),
      in2_features: z.array(z.number()).nonempty('value can\'t be empty'),
      out_features: z.array(z.number()).nonempty('value can\'t be empty'),
      bias: z.boolean().optional(),
    })
  }),

  z.object({
    name: z.literal('Conv1d'),
    props: z.object({
      in_channels: z.array(z.number()).nonempty('value can\'t be empty'),
      out_channels: z.array(z.number()).nonempty('value can\'t be empty'),
      kernel_size: z.array(z.number()).nonempty('value can\'t be empty'),
      stride: z.number().optional(),
      padding: z.number().optional(),
      dilation: z.number().optional(),
      groups: z.number().optional(),
      bias: z.boolean().optional(),
      padding_mode: z.string().optional(),
    })
  }),

  z.object({
    name: z.literal('Conv2d'),
    props: z.object({
      in_channels: z.array(z.number()).nonempty('value can\'t be empty'),
      out_channels: z.array(z.number()).nonempty('value can\'t be empty'),
      kernel_size: z.array(z.number()).nonempty('value can\'t be empty'),
      stride: z.number(),
      padding: z.number().optional(),
      dilation: z.number().optional(),
      groups: z.number().optional(),
      bias: z.boolean().optional(),
      padding_mode: z.string().optional(),
    })
  }),

  z.object({
    name: z.literal('Conv3d'),
    props: z.object({
      in_channels: z.array(z.number()).nonempty('value can\'t be empty'),
      out_channels: z.array(z.number()).nonempty('value can\'t be empty'),
      kernel_size: z.array(z.number()).nonempty('value can\'t be empty'),
      stride: z.number().optional(),
      padding: z.number().optional(),
      dilation: z.number().optional(),
      groups: z.number().optional(),
      bias: z.boolean().optional(),
      padding_mode: z.string().optional(),
    })
  }),

  z.object({
    name: z.literal('ConvTranspose1d'),
    props: z.object({
      in_channels: z.array(z.number()).nonempty('value can\'t be empty'),
      out_channels: z.array(z.number()).nonempty('value can\'t be empty'),
      kernel_size: z.array(z.number()).nonempty('value can\'t be empty'),
      stride: z.number().optional(),
      padding: z.number().optional(),
      output_padding: z.number().optional(),
      bias: z.boolean().optional(),
    })
  }),

  z.object({
    name: z.literal('ConvTranspose2d'),
    props: z.object({
      in_channels: z.array(z.number()).nonempty('value can\'t be empty'),
      out_channels: z.array(z.number()).nonempty('value can\'t be empty'),
      kernel_size: z.array(z.number()).nonempty('value can\'t be empty'),
      stride: z.number().optional(),
      padding: z.number().optional(),
      output_padding: z.number().optional(),
      bias: z.boolean().optional(),
    })
  }),

  z.object({
    name: z.literal('ConvTranspose3d'),
    props: z.object({
      in_channels: z.array(z.number()).nonempty('value can\'t be empty'),
      out_channels: z.array(z.number()).nonempty('value can\'t be empty'),
      kernel_size: z.array(z.number()).nonempty('value can\'t be empty'),
      stride: z.number().optional(),
      padding: z.number().optional(),
      output_padding: z.number().optional(),
      bias: z.boolean().optional(),
    })
  }),

  z.object({
    name: z.literal('MaxPool1d'),
    props: z.object({
      kernel_size: z.array(z.number()).nonempty('value can\'t be empty'),
      stride: z.number().optional(),
      padding: z.number().optional(),
      dilation: z.number().optional(),
      ceil_mode: z.boolean().optional(),
    })
  }),

  z.object({
    name: z.literal('MaxPool2d'),
    props: z.object({
      kernel_size: z.array(z.number()).nonempty('value can\'t be empty'),
      stride: z.number().optional(),
      padding: z.number().optional(),
      dilation: z.number().optional(),
      ceil_mode: z.boolean().optional(),
    })
  }),

  z.object({
    name: z.literal('MaxPool3d'),
    props: z.object({
      kernel_size: z.array(z.number()).nonempty('value can\'t be empty'),
      stride: z.number().optional(),
      padding: z.number().optional(),
      dilation: z.number().optional(),
      ceil_mode: z.boolean().optional(),
    })
  }),

  z.object({
    name: z.literal('AvgPool1d'),
    props: z.object({
      kernel_size: z.array(z.number()).nonempty('value can\'t be empty'),
      stride: z.number().optional(),
      padding: z.number().optional(),
      dilation: z.number().optional(),
      ceil_mode: z.boolean().optional(),
      count_include_pad: z.boolean().optional(),
    })
  }),

  z.object({
    name: z.literal('AvgPool2d'),
    props: z.object({
      kernel_size: z.array(z.number()).nonempty('value can\'t be empty'),
      stride: z.number().optional(),
      padding: z.number().optional(),
      dilation: z.number().optional(),
      ceil_mode: z.boolean().optional(),
      count_include_pad: z.boolean().optional(),
    })
  }),

  z.object({
    name: z.literal('AvgPool3d'),
    props: z.object({
      kernel_size: z.array(z.number()).nonempty('value can\'t be empty'),
      stride: z.number().optional(),
      padding: z.number().optional(),
      dilation: z.number().optional(),
      ceil_mode: z.boolean().optional(),
      count_include_pad: z.boolean().optional(),
    })
  }),

  z.object({
    name: z.literal('BatchNorm1d'),
    props: z.object({
      num_features: z.number(),
      eps: z.number().optional(),
      momentum: z.number().optional(),
      affine: z.boolean().optional(),
      track_running_stats: z.boolean().optional(),
    })
  }),

  z.object({
    name: z.literal('BatchNorm2d'),
    props: z.object({
      num_features: z.number(),
      eps: z.number().optional(),
      momentum: z.number().optional(),
      affine: z.boolean().optional(),
      track_running_stats: z.boolean().optional(),
    })
  }),

  z.object({
    name: z.literal('BatchNorm3d'),
    props: z.object({
      num_features: z.number(),
      eps: z.number().optional(),
      momentum: z.number().optional(),
      affine: z.boolean().optional(),
      track_running_stats: z.boolean().optional(),
    })
  }),

  z.object({
    name: z.literal('LayerNorm'),
    props: z.object({
      normalized_shape: z.array(z.number()).nonempty('value can\'t be empty'),
      eps: z.number().optional(),
      elementwise_affine: z.boolean().optional(),
    })
  }),

  z.object({
    name: z.literal('Transformer'),
    props: z.object({
      d_model: z.number().optional(),
      nhead: z.number().optional(),
      num_encoder_layers: z.number().optional(),
      num_decoder_layers: z.number().optional(),
      dim_feedforward: z.number().optional(),
      dropout: z.number().optional(),
      activation: z.string().optional(),
    })
  }),

  z.object({
    name: z.literal('MultiheadAttention'),
    props: z.object({
      embed_dim: z.number(),
      num_heads: z.number(),
      dropout: z.number().optional(),
      bias: z.boolean().optional(),
      add_bias_kv: z.boolean().optional(),
    })
  }),

  z.object({
    name: z.literal('Dropout'),
    props: z.object({
      p: z.number(),
      inplace: z.boolean().optional(),
    })
  }),

  z.object({
    name: z.literal('Dropout1d'),
    props: z.object({
      p: z.number(),
      inplace: z.boolean().optional(),
    })
  }),

  z.object({
    name: z.literal('Dropout2d'),
    props: z.object({
      p: z.number(),
      inplace: z.boolean().optional(),
    })
  }),

  z.object({
    name: z.literal('Dropout3d'),
    props: z.object({
      p: z.number(),
      inplace: z.boolean().optional(),
    })
  }),

  z.object({
    name: z.literal('Embedding'),
    props: z.object({
      num_embeddings: z.number(),
      embedding_dimx: z.number(),
      padding_idx: z.number().optional(),
      max_norm: z.number().optional(),
      sparse: z.boolean().optional(),
    })
  }),

  z.object({
    name: z.literal('PixelShuffle'),
    props: z.object({
      upscale_factor: z.number(),
    })
  }),

  z.object({
    name: z.literal('Upsample'),
    props: z.object({
      size: z.number(),
      scale_factor: z.number().optional(),
      mode: Interpolation.optional(),
    })
  }),

  z.object({
    name: z.literal('LSTM'),
    props: z.object({
      input_size: z.array(z.number()).nonempty('value can\'t be empty'),
      hidden_size: z.array(z.number()).nonempty('value can\'t be empty'),
      num_layers: z.number().optional(),
      batch_first: z.boolean().optional(),
      bidirectional: z.boolean().optional(),
    })
  }),

  z.object({
    name: z.literal('Flatten'),
    props: z.object({
      start_dim: z.number(),
      end_dim: z.number(),
    })
  }),

  z.object({
    name: z.literal('Unfold'),
    props: z.object({
      kernel_size: z.number(),
      stride: z.number().optional(),
      padding: z.number().optional(),
      dilation: z.number().optional(),
    })
  }),
], {
  error: (issue) => {
    return { message: `Pass correct props for ${(issue.input as any)?.name}`}
  }
}))
// non empty-ness will be checked in helpers of models

// Extract literal names from the union schema
export const customModels = customModelsSchema.unwrap().options.map(e => e.shape.name.value)
// export const customModelsSchema = z.array(z.enum(customModels), { error: 'At least one layer should be selected'}).nonempty()
export type CustomModelType = z.infer<typeof customModelsSchema>[number];


export const ReductionSchema = z.enum(["None", "Mean", "Sum"])
export const pipelineDLLossesSchema = z
  .object({
    CrossEntropyLoss: z
      .object({
        weight: z.array(z.number()).optional(),
        size_average: z.boolean().optional(),
        ignore_index: z.number().optional(),
        reduce: z.boolean().optional(),
        reduction: ReductionSchema.optional(),
        label_smoothing: z.number().optional(),
      })
      .optional(),

    BCELoss: z
      .object({
        weight: z.array(z.number()).optional(),
        size_average: z.boolean().optional(),
        reduce: z.boolean().optional(),
        reduction: ReductionSchema.optional(),
      })
      .optional(),

    BCEWithLogitsLoss: z
      .object({
        weight: z.array(z.number()).optional(),
        size_average: z.boolean().optional(),
        reduce: z.boolean().optional(),
        reduction: ReductionSchema.optional(),
        pos_weight: z.array(z.number()).optional(),
      })
      .optional(),

    MSELoss: z
      .object({
        size_average: z.boolean().optional(),
        reduce: z.boolean().optional(),
        reduction: ReductionSchema.optional(),
      })
      .optional(),

    L1Loss: z
      .object({
        size_average: z.boolean().optional(),
        reduce: z.boolean().optional(),
        reduction: ReductionSchema.optional(),
      })
      .optional(),
  })
export const lossSchema = z.enum(objectKeys(pipelineDLLossesSchema.shape))


export const pipelineDLOptimizersSchema = z
  .object({
    Adam: z
      .object({
        lr: z.number().optional(),
        betas: z.array(z.number()).optional(),
        eps: z.number().optional(),
        weight_decay: z.number().optional(),
        amsgrad: z.boolean().optional(),
      })
      .optional(),

    SDG: z
      .object({
        lr: z.number().optional(),
        momentum: z.number().optional(),
        weight_decay: z.number().optional(),
        dampening: z.number().optional(),
        nesterov: z.boolean().optional(),
      })
      .optional(),

    RMSprop: z
      .object({
        lr: z.number().optional(),
        alpha: z.number().optional(),
        eps: z.number().optional(),
        weight_decay: z.number().optional(),
        momentum: z.number().optional(),
        centered: z.boolean().optional(),
      })
      .optional(),

    Adagrad: z
      .object({
        lr: z.number().optional(),
        lr_decay: z.number().optional(),
        weight_decay: z.number().optional(),
        initial_accumulator: z.number().optional(),
      })
      .optional(),

    NAdam: z
      .object({
        lr: z.number().optional(),
        betas: z.array(z.number()).optional(),
        eps: z.number().optional(),
        weight_decay: z.number().optional(),
      })
      .optional(),
  })
export const optimizerSchema = z.enum(objectKeys(pipelineDLOptimizersSchema.shape))


export const MetricTaskSchema = z.enum(["multiclass", "multilabel"])
export const MetricAverageSchema = z.enum(["micro", "macro", "weighted", "none"])
export const pipelineDLMetricsSchema = z
  .object({
    Accuracy: z
      .object({
        task: MetricTaskSchema,
        num_classes: z.number(),
        threshold: z.number().optional(),
        top_k: z.number().optional(),
        average: MetricAverageSchema.optional(),
      })
      .optional(),

    F1Score: z
      .object({
        task: MetricTaskSchema,
        num_classes: z.number(),
        threshold: z.number().optional(),
        top_k: z.number().optional(),
        average: MetricAverageSchema.optional(),
      })
      .optional(),

    Recall: z
      .object({
        task: MetricTaskSchema,
        num_classes: z.number(),
        threshold: z.number().optional(),
        top_k: z.number().optional(),
        average: MetricAverageSchema.optional(),
      })
      .optional(),

    MeanAbsoluteError: z
      .object({
        num_outputs: z.number().optional(),
      })
      .optional(),
  })
// can be empty.

export const metricsSchema = z.array(z.enum(objectKeys(pipelineDLMetricsSchema.shape)))


export const PipelineDLModeSchema = z.enum(["min", "max"])
export const pipelineDLLRSchedularSchema = z
  .object({
    ReduceLROnPlateau: z.object({
      patience: z.number(),
      factor: z.number().optional(),
      mode: PipelineDLModeSchema.optional(),
      threshold: z.number().optional(),
    }),
  })
export const lrSchedularSchema = z.enum(objectKeys(pipelineDLLRSchedularSchema.shape))


/**
 * They don't have types.
 * Infact it will just be select options (multi select).
 * Or in other words. the state.monitoring will be an array ~ <Set particularly> that can contain any of these values.
 *
 * - && This is not monitors (is something diff.) > it is monitoring
 * */
export const pipelineDLMonitoringSchema = z
  .array(
    z.enum([
      "use_tensorboard",
      "use_wandb",
      "use_mlflow",
      "resource_alerts",
      "threshold_alerts",
    ]),
  )
  .default([])


export const trainingHyperParametersSchema = z
  .object({
    batch_size: z.number(),
    learning_rate: z.number(),
    epochs: z.number(),
    weight_decay: z.number(),
  })

export const EarlyStoppingMonitorSchema = z.enum(["val_loss"])
export const pipelineDLEarlyStoppingSchema = z
  .object({
    patience: z.number(),
    min_delta: z.number().optional(),
    mode: PipelineDLModeSchema.optional(),
    monitor: EarlyStoppingMonitorSchema.optional(),
    verbose: z.boolean().optional(),
    restore_best_weights: z.boolean().optional(),
  })
