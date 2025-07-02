import type { TensorDtype, Interpolation } from "./utility"

// So here is the game plan 
//  we need to go through each type and check in first round which is optional 
// I will move my cursor.. wait there is an audio thing here too.
// maybe join discord as well
// do you see it. i see but disacord will be faster
// ok send me the link 'kouhaisamma'

export type MainTask = "image" | "text" | "audio"

export type SubTasks = {
  image: "classification" | "generation" | "object-detection" | "image-segmentation"
  text: "classification" | "summarization" | "translation" | "generation"
  audio: "classification" | "recognition" | "generation" | "conversion"
}

export type DataFormat = {
  image: "png" | "jpeg" | "jpg" | "pytorch-tensor" | "pickle"
  text: "csv" | "plain-text" | "pytorch-tensor" | "pickle"
  audio: "wav" | "mp3" | "flac" | "pytorch-tensor" | "pickle"
}

/** Transformers are to be used in Data Preprocessing */
// we can get list by using keys of this.
export type Transformers_Image = {
  Resize: {
    /* can be sequence or number */
    size: number[]
    interpolation?: Interpolation
  },
  RandomCrop: {
    size: number[]
    padding?: number[]
    pad_if_needed?: boolean
  },
  RandomHorizontalFlip: {
    p: number
  },
  RandomRotation: {
    /** just a number -> angle */
    degrees: number
    interpolation?: Interpolation
  },
  ColorJitter: {
    /** default all to zero */   
    brightness: number
    contrast: number
    saturation: number
    hue: number
  },
  Grayscale: {
    num_output_channels: number
  },
  RandomAdjustSharpness: {
    sharpness_factor: number,
    p?: number
  },
  Normalize: {
    mean: number[]
    std: number[]
  },
  ConvertImageDtype: {
    dtype: TensorDtype
  },
  ToTensor: {},
  RandomErasing: {
    p: number
    scale?: number[]
    ratio?: number[],
    value?: number
  },
  GaussianBlur: {
    kernel_size: number
    sigma: number[]
  }
}

export type Transformers_Text = {
  RegexTokenizer: {
    /** It will be array of regex patterns, the user will type */
    /** UI-ELEMENT: TEXT BOX ~ write values as comma separated */
    patterns_list: string[]
  }
  SentencePieceTokenizer: {
    /** UI-ELEMENT:  FILE PICKER */
    sp_model_path?: string
  }
  VocabTransform: {
    /** UI-ELEMENT:  TEXTBOX  comma separated */
    vocab: string[]
  }
  ToTensor: {
    /** UI-ELEMENT:  selectMenu  */
    dtype: TensorDtype
  }
  Truncate: {
    /** UI-ELEMENT:  number input box */
    max_seq_len: number
  }
  PadTransform: {
    /** UI-ELEMENT: both: number iniput box */
    max_length: number
    pad_value: number
  }
  AddToken: {
    /** UI-ELEMENT: text box  */
    token: string[]
    begin?: boolean
  }
  BERTTokenizer: {
    /** UI-ELEMENT: file path */
    tokenizer: string
  }
  LabelToIndex: {
    /** UI-ELEMENT:  text box []*/
    label_names: string[]
  }
}

export type Transformers_Audio = {
  Speed: {
    /** UI-ELEMENT: number input */
    orig_freq: number 
    factor: number
  }
  AmplitudeToDB: {
    /** UI-ELEMENT:  1. selectMenu  2. number input*/
    stype: "power" | "magnitude"
    top_db?: number
  }
  Resample: {
    /** UI-ELEMENT:  
     * 1. number input
     * 2. number input
     * 3. select menu 
     * 4. number input
     * 5. number input
     * 6. select tensor menu
    */
    orig_freq: number
    new_freq: number
    resampling_method: "sinc_interp_hann" | "sinc_interp_kaiser"
    lowpass_filter_width: number
    rolloff: number
    beta?: number 
    dtype: TensorDtype
  }
  Fade: {
    /** UI-ELEMENT: 
     * 1. number input
     * 2. number input
     * 3. selectMenu
     */
    fade_in_len?: number
    fade_out_len?: number
    fade_shape?: "half_sine" | "linear" | "logarithmic" | "exponential"
  }
  Vol: {
    /** UI-ELEMENT: 
     * 1. number input
     * 2. selectMenu
     */
    gain: number
    gain_type: "amplitude" | "power" | "db"
  }
  Loudness: {
    /** UI-ELEMENT: 
     * 1. number input
     */
    sample_rate: number
  }
  // AddNoise: {
  //   /** UI-ELEMENT:  
  //    * 1. number input
  //   */
  // }
  Spectrogram: {
    n_fft?: number
    win_length?: number
    hop_length?: number
    pad?: number
    power?: number
    normalized?: "window" | "frame-length" | boolean
    center?: boolean
    pad_mode?: "reflect"
    onesided?: boolean
  }
  MelSpectrogram: {
    /** UI-ELEMENT:  */ 
    sample_rate?: number
    n_fft?: number
    n_mels?: number
    f_min?: number
    f_max?: number
    hop_length?: number
  }
  MFCC: {
    sample_rate?: number
    n_mfcc?: number
    dct_type?: number
    log_mels?: boolean
  }
  TimeStretch: {
    n_freq: number
    fixed_rate?: number
  }
  FrequencyMasking: {
    freq_mask_param: number
    iid_masks?: boolean
  }
  TimeMasking: {
    time_mask_param: number
    iid_masks?: boolean
    p?: number
  }
}

export type Transformers = {
  image: Transformers_Image
  text: Transformers_Text
  audio: Transformers_Audio
}

export type PreTrainedModels_Image = {
  ResNet: {
    pretrained: boolean
    num_classes: number
  }
  EfficientNet: {
    
  }
  VisionTransformer: {
    image_size: number
    patch_size: number
    num_layers: number
    num_heads: number
    hidden_dim: number
  }
  FasterRCNN: {
    backbone: string
    num_classes: number
    min_size: number
    max_size: number
  }
  MaskRCNN: {
    backbone: string, 
    num_classes: number
  }
  DeepLabV3: {
    weights: string,
    num_classes: number,
  }
}

export type PreTrainedModels_Text = {
  GloVe: {
    dim: number
    name: string
  }
  FastText: {
    language: string
  }
  Transformer: {
    d_mode?: number,
    nhead?: number,
    num_encoder_layers?: number,
    num_decoder_layers?: number,
    dim_feedforward?: number,
    dropout?: number,
    activation?: string,
    layer_norm_eps?: number,
    batch_first?: boolean,
    norm_first?: boolean,
    device?: string,
    dtype?: TensorDtype
  }
  // XLMRoberta: {
  //   num_classes: number
  //   dropout: number
  //   pooler_type: string
  // }
}

export type PreTrainedModels_Audio = {
  Conformer: {
    input_dim: number
    num_heads: number
    ffn_dim: number
    num_layers: number
    depthwise_conv_kernel_size: number
    dropout?: number
    use_group_norm?: boolean
    convolution_first?: boolean
  }
  Wave2Letter: {
    num_classes: number
    input_type?: string
    num_features?: number
  }
  WaveRNN: {
    upsample_scales: number[]
    n_classes: number
    hop_length: number
    n_res_block?: number
    n_rnn?: number
    n_fc?: number
    kernel_size?: number
    n_freq?: number
    n_hidden?: number
    n_output?: number
  }
}

export type PreTrainedModels = {
  image: PreTrainedModels_Image
  text: PreTrainedModels_Text
  audio: PreTrainedModels_Audio
}

export type CustomModels = {
  Linear: { 
    in_features: number[]; 
    out_features: number[]; 
    bias?: boolean 
  }
  Bilinear: {
    in1_features: number[]
    in2_features: number[]
    out_features: number[]
    bias?: boolean
  }
  Conv1d: {
    in_channels: number[]
    out_channels: number[]
    kernel_size: number[]
    stride?: number
    padding?: number
    dilation?: number
    groups?: number
    bias?: boolean
    padding_mode?: string
  }
  Conv2d: {
    in_channels: number[]
    out_channels: number[]
    kernel_size: number[]
    stride: number
    padding?: number
    dilation?: number
    groups?: number
    bias?: boolean
    padding_mode?: string
  }
  Conv3d: {
    in_channels: number[]
    out_channels: number[]
    kernel_size: number[]
    stride?: number
    padding?: number
    dilation?: number
    groups?: number
    bias?: boolean
    padding_mode?: string
  }
  ConvTranspose1d: {
    in_channels: number[]
    out_channels: number[]
    kernel_size: number[]
    stride?: number
    padding?: number
    output_padding?: number
    bias?: boolean
  }
  ConvTranspose2d: {
    in_channels: number[]
    out_channels: number[]
    kernel_size: number[]
    stride?: number
    padding?: number
    output_padding?: number
    bias?: boolean
  }
  ConvTranspose3d: {
    in_channels: number[]
    out_channels: number[]
    kernel_size: number[]
    stride?: number
    padding?: number
    output_padding?: number
    bias?: boolean
  }
  MaxPool1d: {
    kernel_size: number[]
    stride?: number
    padding?: number
    dilation?: number
    ceil_mode?: boolean
  }
  MaxPool2d: {
    kernel_size: number[]
    stride?: number
    padding?: number
    dilation?: number
    ceil_mode?: boolean
  }
  MaxPool3d: {
    kernel_size: number[]
    stride?: number
    padding?: number
    dilation?: number
    ceil_mode?: boolean
  }
  AvgPool1d: {
    kernel_size: number[]
    stride?: number
    padding?: number
    dilation?: number
    ceil_mode?: boolean
    count_include_pad?: boolean
  }
  AvgPool2d: {
    kernel_size: number[]
    stride?: number
    padding?: number
    dilation?: number
    ceil_mode?: boolean
    count_include_pad?: boolean
  }
  AvgPool3d: {
    kernel_size: number[]
    stride?: number
    padding?: number
    dilation?: number
    ceil_mode?: boolean
    count_include_pad?: boolean
  }
  BatchNorm1d: {
    num_features: number
    eps?: number
    momentum?: number
    affine?: boolean
    track_running_stats?: boolean
  }
  BatchNorm2d: {
    num_features: number
    eps?: number
    momentum?: number
    affine?: boolean
    track_running_stats?: boolean
  }
  BatchNorm3d: {
    num_features: number
    eps?: number
    momentum?: number
    affine?: boolean
    track_running_stats?: boolean
  }
  LayerNorm: {
    normalized_shape: number[]
    eps?: number
    elementwise_affine?: boolean
  }
  Transformer: {
    d_model?: number
    nhead?: number
    num_encoder_layers?: number
    num_decoder_layers?: number
    dim_feedforward?: number
    dropout?: number
    activation?: string
  }
  MultiheadAttention: {
    embed_dim: number
    num_heads: number
    dropout?: number
    bias?: boolean
    add_bias_kv?: boolean
  }
  Dropout: { 
    p: number; 
    inplace?: boolean 
  }
  Dropout1d: { 
    p: number; 
    inplace?: boolean 
  }
  Dropout2d: { 
    p: number; 
    inplace?: boolean 
  }
  Dropout3d: { 
    p: number; 
    inplace?: boolean 
  }
  Embedding: {
    num_embeddings: number
    embedding_dimx: number
    padding_idx?: number
    max_norm?: number
    sparse?: boolean
  }
  PixelShuffle: { 
    upscale_factor: number 
  }
  Upsample: { 
    size: number; 
    scale_factor?: number; 
    mode?: Interpolation 
  }
  LSTM: {
    input_size: number[]
    hidden_size: number[]
    num_layers?: number
    batch_first?: boolean
    bidirectional?: boolean
  }
  Flatten: { 
    start_dim: number; 
    end_dim: number 
  }
  Unfold: {
    kernel_size: number
    stride?: number
    padding?: number
    dilation?: number
  }
}


/**
 * In types they will be used like 
 * @example losses: Losses[]
 */
export type Losses = {
  CrossEntropyLoss: {
    weight?: number[],
    size_average?: boolean,
    ignore_index?: number,
    reduce?: boolean,
    reduction?: 'None' | 'Mean' | 'Sum',
    label_smoothing?: number
  },
  BCELoss: {
    weight?: number[],
    size_average?: boolean,
    reduce?: boolean, 
    reduction?: 'None' | 'Mean' | 'Sum'
  },
  BCEWithLogitsLoss: {
    weight?: number[],
    size_average?: boolean,
    reduce?: boolean,
    reduction?: 'None' | 'Mean' | 'Sum',
    pos_weight?: number[]
  },
  MSELoss: {
    size_average?: boolean,
    reduce?: boolean,
    reduction?: 'None' | 'Mean' | 'Sum'
  },
  L1Loss: {
    size_average?: boolean,
    reduce?: boolean,
    reduction?: 'None' | 'Mean' | 'Sum'
  }
}
  
export type Optimizers = {
  'Adam': {
    lr?: number,
    betas?: number[],
    eps?: number,
    weight_decay?: number,
    amsgrad?: boolean
  },
  'SDG': {
    lr?: number,
    momentum?: number,
    weight_decay?: number,
    dampening?: number,
    nesterov?: number
  },
  'RMSprop': {
    lr?: number,
    alpha?: number,
    eps?: number,
    weight_decay?: number,
    momentum?: number,
    centered?: boolean
  },
  'Adagrad': {
    lr?: number,
    lr_decay?: number,
    weighti_decay?: number,
    initial_accumulator?: number
  },
  'NAdam': {
    lr?: number,
    betas?: number,
    eps?: number,
    weight_decay?: number
  },
}

/** 
 * They don't have types.  
 * Infact it will just be select options (multi select).
 * Or in other words. the state.monitoring will be an array ~ <Set particularly> that can contain any of these values.
 * 
 * - && This is not monitors (is something diff.) > it is monitoring
 * */
export type Monitoring = 
  | 'use_tensorboard'
  | 'use_wandb'
  | 'use_mlflow'
  | 'resource_alerts'
  | 'threshold_alerts'

export type Metrics = {
  'Accuracy': {
    task: "binary" | "multiclass" | "multilabel",
    num_classes: number,
    threshold?: number,
    top_k?: number,
    average?: "micro" | "macro" | "weighted" | "none",
  },
  'F1Score': {
    task: "binary" | "multiclass" | "multilabel",
    num_classes: number,
    threshold?: number,
    top_k?: number,
    average?: "micro" | "macro" | "weighted" | "none",
  },
  'Recall': {
    task: "binary" | "multiclass" | "multilabel",
    num_classes: number,
    threshold?: number,
    top_k?: number,
    average?: "micro" | "macro" | "weighted" | "none",
  },
  'MeanAbsoluteError': {
    num_outputs?: number
  },
}

export type EarlyStopping = {
  patience: number,
  min_delta?: number,
  mode?: 'min' | 'max',
  monitor?: 'val_loss',
  verbose?: boolean,
  restore_best_weights?: boolean
}

export type LRSchedular = {
  'ReduceLROnPlateau': {
    patience: number,
    factor?: number,
    mode?: "min" | "max",
    threshold?: number
  }
}










/** this was in pipelineDL-store */
export type PipelineDL<T extends MainTask> = {
  mainTask: T,
  subtask: SubTasks[T],
  dataFormat: DataFormat[T],
  transformers: Partial<Transformers[T]>,
  pretrainedModels: Partial<PreTrainedModels[T]>
  /**
  * @description Using Partial<> we can skip some too..
  * @example 
  * customModels: {
  *   Linear: {...stuff here},
  *   Bilinear: {...stuff here}
  * }
  */
  customModels: Partial<CustomModels>
  losses: Partial<Losses>,
  optimizers: Partial<Metrics>,
  monitoring: Set<Monitoring>,
  metrics: Partial<Metrics>
  earlyStopping: EarlyStopping,
  lrSchedular: Partial<LRSchedular>
}