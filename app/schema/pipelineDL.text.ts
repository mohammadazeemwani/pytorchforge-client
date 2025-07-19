import * as z from "zod/v4"
import {
  TensorD,
} from "./pipelineDL.general"
import { objectKeys } from "ts-extras"

export const textTransformersSchema = z.object({
  RegexTokenizer: z
    .object({
      /** It will be array of regex patterns, the user will type */
      /** UI-ELEMENT: TEXT BOX ~ write values as comma separated */
      patterns_list: z.array(z.string()).nonempty('value can\'t be empty'),
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
      vocab: z.array(z.string()).optional(),
    })
    .optional(),
  ToTensor: z
    .object({
      /** UI-ELEMENT:  selectMenu  */
      dtype: TensorD,
    })
    .optional(),
  Truncate: z
    .object({
      /** UI-ELEMENT:  number input box */
      max_seq_len: z.number(),
    })
    .optional(),
  PadTransform: z
    .object({
      /** UI-ELEMENT: both: number iniput box */
      max_length: z.number(),
      pad_value: z.number(),
    })
    .optional(),
  AddToken: z
    .object({
      /** UI-ELEMENT: text box  */
      token: z.array(z.string()).nonempty('value can\'t be empty'),
      begin: z.boolean().optional(),
    })
    .optional(),
  BERTTokenizer: z
    .object({
      /** UI-ELEMENT: file path */
      tokenizer: z.string(),
    })
    .optional(),
  LabelToIndex: z
    .object({
      /** UI-ELEMENT:  text box []*/
      label_names: z.array(z.string()).optional(),
    })
    .optional(),
})

export const textPretrainedModelsSchema = z.object({
  GloVe: z.object({
    dim: z.number(),
    name: z.string(),
  }).optional(),
  FastText: z.object({
    language: z.string(),
  }).optional(),
  Transformer: z.object({
    d_model: z.number().optional(),
    nhead: z.number().optional(),
    num_encoder_layers: z.number().optional(),
    num_decoder_layers: z.number().optional(),
    dim_feedforward: z.number().optional(),
    dropout: z.number().optional(),
    activation: z.string().optional(),
    layer_norm_eps: z.number().optional(),
    batch_first: z.boolean().optional(),
    norm_first: z.boolean().optional(),
    device: z.string().optional(),
    dtype: TensorD.optional(),
  }).optional(),
})

/** gives an array of transformers that can be used when mainTask = 'text' */
export const textTransformers = objectKeys(textTransformersSchema.shape)

/** gives an array of pretrainedModels that can be used when mainTask = 'text' */
export const textPretrainedModels = objectKeys(textPretrainedModelsSchema.shape)

export const pipelineDLTextSchema = z.object({
  mainTask: z.literal("text"),
  subTask: z
    .enum(["classification", "summarization", "translation", "generation"]),
  dataFormat: z
    .enum(["csv", "plain-text", "pytorch-tensor", "pickle"]),
  transformers: z.array(z.enum(textTransformers)),
  pretrainedModel: z.enum(textPretrainedModels),
})
