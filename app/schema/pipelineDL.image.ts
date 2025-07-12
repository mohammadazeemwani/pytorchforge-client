import * as z from "zod/v4"
import {
  Interpolation,
  TensorD,
  arrayNumberSchema,
  customModels,
} from "./pipelineDL.general"
import { objectKeys } from "ts-extras"

export const imageTransformersSchema = z.object({
  Resize: z.object({
    size: z.array(z.number()),
    interpolation: Interpolation.optional(),
  }),
  RandomCrop: z.object({
    size: z.array(z.number()),
    padding: z.array(z.number()),
    pad_if_needed: z.boolean().optional(),
  }),
  RandomHorizontalFlip: z.object({
    p: z.number(),
  }),
  ColorJitter: z.object({
    brightness: z.number(),
    contrast: z.number(),
    saturation: z.number(),
    hue: z.number(),
  }),
  Grayscale: z.object({
    num_output_channels: z.number(),
  }),
  RandomAdjustSharpness: z.object({
    sharpness_factor: z.number(),
    p: z.number().optional(),
  }),
  Normalize: z.object({
    mean: z.array(z.number()),
    std: z.array(z.number()),
  }),
  ConvertImageDtype: z.object({
    dtype: TensorD,
  }),
  ToTensor: z
    .object({
      /** UI-ELEMENT:  selectMenu  */
      dtype: TensorD,
    })
    .optional(),
  RandomErasing: z.object({
    p: z.number(),
    scale: z.array(z.number()),
    ratio: z.array(z.number()),
    value: z.number().optional(),
  }),
  GaussianBlur: z.object({
    kernel_size: z.number(),
    sigma: z.array(z.number()),
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
export const imageTransformers = objectKeys(imageTransformersSchema.shape)

/** gives an array of pretrainedModels that can be used when mainTask = 'image' */
export const imagePretrainedModels = objectKeys(imagePretrainedModelsSchema.shape)

export const pipelineDLImageSchema = z.object({
  mainTask: z.literal("image"),
  subTask: z
    .enum([
      "classification",
      "generation",
      "object-detection",
      "image-segmentation",
    ])
    .default("classification"),
  dataFormat: z
    .enum(["png", "jpeg", "jpg", "pytorch-tensor", "pickle"])
    .default("png"),
  transformers: z.array(z.enum(imageTransformers)).default([]),
  pretrainedModels: z.array(z.enum(imagePretrainedModels)).default([]),
  customModels: z.array(z.enum(customModels)).default([]),
})
