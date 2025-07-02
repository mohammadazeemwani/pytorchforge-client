import * as z from "zod/v4"
import {
  TensorD,
  customModels,
  pipelineDLLossesSchema,
  pipelineDLOptimizersSchema,
  pipelineDLMonitoringSchema,
  pipelineDLMetricsSchema,
  pipelineDLEarlyStoppingSchema,
  pipelineDLLRSchedularSchema,
} from "./pipelineDL.general"
import { objectKeys } from "ts-extras"

export const textTransformersSchema = z.object({
  RegexTokenizer: z
    .object({
      /** It will be array of regex patterns, the user will type */
      /** UI-ELEMENT: TEXT BOX ~ write values as comma separated */
      patterns_list: z.array(z.string()).default(["w+"]),
    })
    .optional(),
  SentencePieceTokenizer: z
    .object({
      /** UI-ELEMENT:  FILE PICKER */
      sp_model_path: z.string().optional(),
    })
    .optional(),
  VocabTransform: z
    .object({
      /** UI-ELEMENT:  TEXTBOX  comma separated */
      vocab: z.array(z.string()).default([]),
    })
    .optional(),
  ToTensor: z
    .object({
      /** UI-ELEMENT:  selectMenu  */
      dtype: TensorD.default("int64"),
    })
    .optional(),
  Truncate: z
    .object({
      /** UI-ELEMENT:  number input box */
      max_seq_len: z.number().default(128),
    })
    .optional(),
  PadTransform: z
    .object({
      /** UI-ELEMENT: both: number iniput box */
      max_length: z.number().default(128),
      pad_value: z.number().default(0),
    })
    .optional(),
  AddToken: z
    .object({
      /** UI-ELEMENT: text box  */
      token: z.array(z.string()).default(["<CLS>"]),
      begin: z.boolean().optional().default(true),
    })
    .optional(),
  BERTTokenizer: z
    .object({
      /** UI-ELEMENT: file path */
      tokenizer: z.string().default("facebook/bart-base"),
    })
    .optional(),
  LabelToIndex: z
    .object({
      /** UI-ELEMENT:  text box []*/
      label_names: z.array(z.string()).default([]),
    })
    .optional(),
})

export const textPretrainedModelsSchema = z.object({
  GloVe: z.object({
    dim: z.number().default(300),
    name: z.string().default("6B"),
  }),
  FastText: z.object({
    language: z.string().default("en"),
  }),
  Transformer: z.object({
    d_model: z.number().default(512).optional(),
    nhead: z.number().default(8).optional(),
    num_encoder_layers: z.number().default(6).optional(),
    num_decoder_layers: z.number().default(6).optional(),
    dim_feedforward: z.number().default(2048).optional(),
    dropout: z.number().default(0.1).optional(),
    activation: z.string().default("<function relu>").optional(),
    layer_norm_eps: z.number().default(1e-5).optional(),
    batch_first: z.boolean().default(false).optional(),
    norm_first: z.boolean().default(true).optional(),
    device: z.string().optional(),
    dtype: TensorD.default("float32").optional(),
  }),
})

/** gives an array of transformers that can be used when mainTask = 'text' */
export const textTransformers = objectKeys(textTransformersSchema)

/** gives an array of pretrainedModels that can be used when mainTask = 'text' */
export const textPretrainedModels = objectKeys(textPretrainedModelsSchema)

export const pipelineDLTextSchema = z.object({
  mainTask: z.literal("text"),
  subTask: z
    .enum(["classification", "summarization", "translation", "generation"])
    .default("classification"),
  dataFormat: z
    .enum(["csv", "plain-text", "pytorch-tensor", "pickle"])
    .default("plain-text"),
  transformers: z.array(z.enum(textTransformers)),
  pretrainedModels: z.array(z.enum(textPretrainedModels)),
  customModels: z.array(z.enum(customModels)),
  losses: pipelineDLLossesSchema,
  optimizers: pipelineDLOptimizersSchema,
  monitoring: pipelineDLMonitoringSchema,
  metrics: pipelineDLMetricsSchema,
  earlyStopping: pipelineDLEarlyStoppingSchema,
  lrSchedular: pipelineDLLRSchedularSchema,
})
