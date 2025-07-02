import type { PipelineDL } from "~/types/pipelineDL"

type DefaultsPipelineDL = {
  image: PipelineDL<"image">
  text: PipelineDL<"text">
  audio: PipelineDL<"audio">
}
/**
 * It is imp to consider that these are default values
 */
export const pipelineDLDefaults: DefaultsPipelineDL = {
  image: {
    mainTask: "image",
    subtask: "classification",
    dataFormat: "jpeg",
    transformers: {
      Resize: {
        size: [224, 224],
        interpolation: "BILINEAR",
      },
      RandomCrop: {
        size: [224, 224],
        padding: undefined,
        pad_if_needed: undefined,
      },
      RandomHorizontalFlip: {
        p: 0.5,
      },
      RandomRotation: {
        degrees: 15,
        interpolation: "NEAREST",
      },
      ColorJitter: {
        brightness: 0.4,
        contrast: 0.4,
        saturation: 0.4,
        hue: 0.1,
      },
      Grayscale: {
        num_output_channels: 1,
      },
      RandomAdjustSharpness: {
        sharpness_factor: 2,
        p: 0.5,
      },
      Normalize: {
        mean: [0.5],
        std: [0.5],
      },
      ConvertImageDtype: {
        dtype: "float32",
      },
      /** it has no types, render in UI the params setting UI like text boxes and all if that value has any param */
      ToTensor: {},
      RandomErasing: {
        p: 0.5,
        scale: [0.02, 0.33],
        ratio: [0.3, 3.3],
        value: 0,
      },
      GaussianBlur: {
        kernel_size: 3,
        sigma: [0.1, 2.0],
      },
    },
    pretrainedModels: {},
  },
  text: {
    mainTask: "text",
    subtask: "classification",
    dataFormat: "plain-text",
    transformers: {
      RegexTokenizer: {
        patterns_list: ["w+"],
      },
      SentencePieceTokenizer: {
        sp_model_path: undefined,
      },
      VocabTransform: {
        vocab: [],
      },
      ToTensor: {
        dtype: "int64",
      },
      Truncate: {
        max_seq_len: 128,
      },
      PadTransform: {
        max_length: 128,
        pad_value: 0,
      },
      AddToken: {
        token: ["<CLS>"],
        begin: undefined,
      },
      BERTTokenizer: {
        tokenizer: "facebook/bart-base",
      },
      LabelToIndex: {
        label_names: [],
      },
    },
  },
  audio: {
    mainTask: "audio",
    subtask: "classification",
    dataFormat: "mp3",
    transformers: {
      Speed: {
        orig_freq: 16000,
        factor: 1.0,
      },
      AmplitudeToDB: {
        stype: "power",
        top_db: undefined,
      },
      Resample: {
        orig_freq: 16000,
        new_freq: 16000,
        resampling_method: "sinc_interp_hann",
        lowpass_filter_width: 6,
        rolloff: 0.99,
        beta: undefined,
        dtype: "float32",
      },
      Fade: {
        fade_in_len: 0,
        fade_out_len: 0,
        fade_shape: "linear",
      },
      Vol: {
        gain: 1.0,
        gain_type: "amplitude",
      },
      Loudness: {},
    },
  },
}
