import * as z from "zod/v4"
import {
  Interpolation,
  TensorD,
  arrayNumberSchema,
  customModels,
} from "./pipelineDL.general"
import { objectKeys } from "ts-extras"

export const imageTransformersSchema = z.object({
  Resize: z
    .object({
      size: z.array(z.number()).nonempty('value can\'t be empty'),
      interpolation: Interpolation.optional(),
    })
    .optional(),
  RandomCrop: z
    .object({
      size: z.array(z.number()).nonempty('value can\'t be empty'),
      padding: z.array(z.number()).nonempty('value can\'t be empty'),
      pad_if_needed: z.boolean().optional(),
    })
    .optional(),
  RandomHorizontalFlip: z
    .object({
      p: z.number(),
    })
    .optional(),
  ColorJitter: z
    .object({
      brightness: z.number(),
      contrast: z.number(),
      saturation: z.number(),
      hue: z.number(),
    })
    .optional(),
  Grayscale: z
    .object({
      num_output_channels: z.number(),
    })
    .optional(),
  RandomAdjustSharpness: z
    .object({
      sharpness_factor: z.number(),
      p: z.number().optional(),
    })
    .optional(),
  Normalize: z
    .object({
      mean: z.array(z.number()).nonempty('value can\'t be empty'),
      std: z.array(z.number()).nonempty('value can\'t be empty'),
    })
    .optional(),
  ConvertImageDtype: z
    .object({
      dtype: TensorD,
    })
    .optional(),
  ToTensor: z
    .object({
      /** UI-ELEMENT:  selectMenu  */
      dtype: TensorD,
    })
    .optional(),
  RandomErasing: z
    .object({
      p: z.number(),
      scale: z.array(z.number()).nonempty('value can\'t be empty'),
      ratio: z.array(z.number()).nonempty('value can\'t be empty'),
      value: z.number().optional(),
    })
    .optional(),
  GaussianBlur: z
    .object({
      kernel_size: z.number(),
      sigma: z.array(z.number()).nonempty('value can\'t be empty'),
    })
    .optional(),
})

export const imagePretrainedModelsSchema = z.object({
  ResNet: z.object({
    pretrained: z.boolean(),
    num_classes: z.number(),
  }).optional(),
  EfficientNet: z.object({
    width_mult: z.number(),
    depth_mult: z.number(),
    dropout: z.number()
  }).optional(),
  VisionTransformer: z.object({
    image_size: z.number(),
    patch_size: z.number(),
    num_layers: z.number(),
    num_heads: z.number(),
    hidden_dim: z.number(),
  }).optional(),
  FasterRCNN: z.object({
    backbone: z.string(),
    num_classes: z.number(),
    min_size: z.number(),
    max_size: z.number(),
  }).optional(),
  MaskRCNN: z.object({
    backbone: z.string(),
    num_classes: z.number(),
  }).optional(),
  DeepLabV3: z.object({
    weights: z.string(),
    num_classes: z.number(),
  }).optional(),
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
    ]),
  dataFormat: z
    .enum(["png", "jpeg", "jpg", "pytorch-tensor", "pickle"]),
  transformers: z.array(z.enum(imageTransformers)),

  pretrainedModel: z.enum(imagePretrainedModels),
})
