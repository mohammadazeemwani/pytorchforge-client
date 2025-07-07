import * as z from "zod/v4"
import {
  Interpolation,
  TensorD,
  customModels,
  pipelineDLLossesSchema,
  pipelineDLOptimizersSchema,
  pipelineDLMonitoringSchema,
  pipelineDLMetricsSchema,
  pipelineDLEarlyStoppingSchema,
  pipelineDLLRSchedularSchema,
  dataFormatPickerSchema,
  trainingHyperParametersSchema,
} from "./pipelineDL.general"
import { objectKeys } from "ts-extras"

export const imageTransformersSchema = z.object({
  Resize: z.object({
    size: z.array(z.number()).default([224, 224]),
    interpolation: Interpolation.optional().default("bilinear"),
  }),
  RandomCrop: z.object({
    size: z.array(z.number()).default([224, 224]),
    padding: z.array(z.number()).optional(),
    pad_if_needed: z.boolean().optional(),
  }),
  RandomHorizontalFlip: z.object({
    p: z.number().default(0.5),
  }),
  ColorJitter: z.object({
    brightness: z.number().default(0.4),
    contrast: z.number().default(0.4),
    saturation: z.number().default(0.4),
    hue: z.number().default(0.1),
  }),
  Grayscale: z.object({
    num_output_channels: z.number().default(1),
  }),
  RandomAdjustSharpness: z.object({
    sharpness_factor: z.number().default(2),
    p: z.number().optional().default(0.5),
  }),
  Normalize: z.object({
    mean: z.array(z.number()).default([0.5]),
    std: z.array(z.number()).default([0.5]),
  }),
  ConvertImageDtype: z.object({
    dtype: TensorD.default("float32"),
  }),
  ToTensor: z.object({
    /** Empty object means no param input */
  }),
  RandomErasing: z.object({
    p: z.number().default(0.5),
    scale: z.array(z.number()).default([0.02, 0.33]).optional(),
    ratio: z.array(z.number()).default([0.3, 3.3]).optional(),
    value: z.number().default(0).optional(),
  }),
  GaussianBlur: z.object({
    kernel_size: z.number().default(3),
    sigma: z.array(z.number()).default([0.1, 2.0]),
  }),
})

export const imagePretrainedModelsSchema = z.object({
  ResNet: z.object({
    pretrained: z.boolean().default(true),
    num_classes: z.number().default(1000),
  }),
  EfficientNet: z.object({}),
  VisionTransformer: z.object({
    image_size: z.number().default(224),
    patch_size: z.number().default(16),
    num_layers: z.number().default(12),
    num_heads: z.number().default(12),
    hidden_dim: z.number().default(768),
  }),
  FasterRCNN: z.object({
    backbone: z.string().default("resnet50"),
    num_classes: z.number().default(91),
    min_size: z.number().default(800),
    max_size: z.number().default(1333),
  }),
  MaskRCNN: z.object({
    backbone: z.string().default("resnet50"),
    num_classes: z.number().default(91),
  }),
  DeepLabV3: z.object({
    weights: z.string().default("resnet50"),
    num_classes: z.number().default(21),
  }),
})

/** gives an array of transformers that can be used when mainTask = 'image' */
export const imageTransformers = objectKeys(imageTransformersSchema)

/** gives an array of pretrainedModels that can be used when mainTask = 'image' */
export const imagePretrainedModels = objectKeys(imagePretrainedModelsSchema)

export const pipelineDLImageSchema = z.object({
  mainTask: z.literal("image"),
  subTask: z
    .enum(["classification", "generation", "object-detection", "image-segmentation"])
    .default('classification'),
  dataFormat: z
    .enum(["png", "jpeg", "jpg", "pytorch-tensor", "pickle"])
    .default('png'),
  dataFormatPicker: dataFormatPickerSchema,
  transformers: z.array(z.enum(imageTransformers)).default([]),
  pretrainedModels: z.array(z.enum(imagePretrainedModels)).default([]),
  customModels: z.array(z.enum(customModels)).default([]),
  losses: pipelineDLLossesSchema,
  optimizers: pipelineDLOptimizersSchema,
  monitoring: pipelineDLMonitoringSchema,
  metrics: pipelineDLMetricsSchema,
  trainingHyperParameters: trainingHyperParametersSchema,
  earlyStopping: pipelineDLEarlyStoppingSchema,
  lrSchedular: pipelineDLLRSchedularSchema,
})
