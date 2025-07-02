import * as z from "zod/v4"
import {
  pipelineDLImageSchema,
  imageTransformersSchema,
  imagePretrainedModelsSchema,
} from "./pipelineDL.image"
import {
  pipelineDLTextSchema,
  textTransformersSchema,
  textPretrainedModelsSchema,
} from "./pipelineDL.text"
import {
  pipelineDLAudioSchema,
  audioTransformersSchema,
  audioPretrainedModelsSchema,
} from "./pipelineDL.audio"

export const pipelineDLSchema = z.discriminatedUnion("mainTask", [
  pipelineDLImageSchema,
  pipelineDLTextSchema,
  pipelineDLAudioSchema,
])

export const pipelineDLTransformersSchema = z.object({
  ...imageTransformersSchema.shape,
  ...textTransformersSchema.shape,
  ...audioTransformersSchema.shape,
})

export const pipelineDLPretrainedModelsSchema = z.object({
  ...imagePretrainedModelsSchema.shape,
  ...textPretrainedModelsSchema.shape,
  ...audioPretrainedModelsSchema.shape,
})

export { pipelineDLCustomModelsSchema } from "./pipelineDL.general"
