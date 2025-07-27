export default {
  "mainTask": "image",
  "subTask": "classification",
  "dataFormat": "png",
  "transformers": [
    "Resize",
    "RandomCrop",
    "RandomHorizontalFlip",
    "ColorJitter",
    "Grayscale",
    "RandomAdjustSharpness",
    "Normalize",
    "ConvertImageDtype",
    "ToTensor",
    "RandomErasing",
    "GaussianBlur"
  ],
  "pretrainedModel": "ResNet",
  "dataSource": {
    "type": "file",
    "value": "/Users/mohammadazeemwani/Downloads/books/Building Microservices, 2nd Edition.pdf"
  },
  "usePreTrained": true,
  "transformersData": {
    "Resize": {
      "size": [
        224,
        224
      ],
      "interpolation": "bilinear"
    },
    "RandomCrop": {
      "size": [
        224,
        224
      ],
      "padding": [
        90
      ]
    },
    "RandomHorizontalFlip": {
      "p": 0.5
    },
    "ColorJitter": {
      "brightness": 0.4,
      "contrast": 0.4,
      "saturation": 0.4,
      "hue": 0.1
    },
    "Grayscale": {
      "num_output_channels": 1
    },
    "RandomAdjustSharpness": {
      "sharpness_factor": 2,
      "p": 0.5
    },
    "Normalize": {
      "mean": [
        0.5
      ],
      "std": [
        0.5
      ]
    },
    "ConvertImageDtype": {
      "dtype": "float32"
    },
    "ToTensor": {
      "dtype": "float32"
    },
    "RandomErasing": {
      "p": 0.5,
      "scale": [
        0.02,
        0.33
      ],
      "ratio": [
        0.3,
        3.3
      ],
      "value": 0
    },
    "GaussianBlur": {
      "kernel_size": 3,
      "sigma": [
        0.1,
        2
      ]
    },
    "RegexTokenizer": {
      "patterns_list": [
        "w+"
      ]
    },
    "Truncate": {
      "max_seq_len": 128
    },
    "PadTransform": {
      "max_length": 128,
      "pad_value": 0
    },
    "AddToken": {
      "token": [
        "<CLS>"
      ],
      "begin": true
    },
    "BERTTokenizer": {
      "tokenizer": "facebook/bart-base"
    },
    "Speed": {
      "orig_freq": 16000,
      "factor": 1
    },
    "AmplitudeToDB": {
      "stype": "power"
    },
    "Resample": {
      "orig_freq": 16000,
      "new_freq": 16000,
      "resampling_method": "sinc_interp_hann",
      "lowpass_filter_width": 6,
      "rolloff": 0.99,
      "dtype": "float32"
    },
    "Fade": {
      "fade_in_len": 0,
      "fade_out_len": 0,
      "fade_shape": "half_sine"
    },
    "Vol": {
      "gain": 1,
      "gain_type": "amplitude"
    },
    "Loudness": {
      "sample_rate": 16000
    },
    "Spectrogram": {
      "pad_mode": "reflect",
      "onesided": true,
      "center": true
    },
    "MelSpectrogram": {
      "sample_rate": 16000,
      "n_fft": 400,
      "n_mels": 120,
      "f_min": 0
    },
    "MFCC": {
      "sample_rate": 16000,
      "n_mfcc": 40,
      "dct_type": 2,
      "log_mels": false
    },
    "TimeStrech": {
      "n_freq": 201
    },
    "FrequencyMasking": {
      "freq_mask_param": 30
    },
    "TimeMasking": {
      "time_mask_param": 40
    }
  },
  "pretrainedModelsData": {
    "ResNet": {
      "pretrained": true,
      "num_classes": 1000
    },
    "EfficientNet": {
      "width_mult": 1,
      "depth_mult": 1,
      "dropout": 0.2
    },
    "VisionTransformer": {
      "image_size": 224,
      "patch_size": 16,
      "num_layers": 12,
      "num_heads": 12,
      "hidden_dim": 768
    },
    "FasterRCNN": {
      "backbone": "resnet50",
      "num_classes": 91,
      "min_size": 800,
      "max_size": 1333
    },
    "MaskRCNN": {
      "backbone": "resnet50",
      "num_classes": 91
    },
    "DeepLabV3": {
      "weights": "resnet50",
      "num_classes": 91
    },
    "GloVe": {
      "dim": 300,
      "name": "6B"
    },
    "FastText": {
      "language": "en"
    },
    "Transformer": {
      "d_model": 512,
      "nhead": 8,
      "num_encoder_layers": 6,
      "num_decoder_layers": 6,
      "dim_feedforward": 2048,
      "dropout": 0.1,
      "activation": "<function relu>",
      "layer_norm_eps": 0.00001,
      "batch_first": false,
      "norm_first": true,
      "dtype": "float32"
    },
    "Conformer": {
      "input_dim": 80,
      "num_heads": 4,
      "ffn_dim": 256,
      "num_layers": 6,
      "depthwise_conv_kernel_size": 31,
      "dropout": 0,
      "use_group_norm": false,
      "convolution_first": false
    },
    "Wave2Letter": {
      "num_classes": 40,
      "input_type": "waveform",
      "num_features": 1
    },
    "WaveRNN": {
      "upsample_scales": [
        5,
        5,
        8
      ],
      "n_classes": 256,
      "hop_length": 200,
      "n_res_block": 10,
      "n_rnn": 512,
      "n_fc": 512,
      "kernel_size": 5,
      "n_freq": 128,
      "n_hidden": 128,
      "n_output": 128
    }
  },
  "customModels": [
    {
      "name": "Conv1d",
      "props": {
        "in_channels": []
      }
    }
  ],
  "loss": "CrossEntropyLoss",
  "lossesData": {
    "CrossEntropyLoss": {
      "size_average": false,
      "ignore_index": -100,
      "reduce": false,
      "reduction": "Mean",
      "label_smoothing": 0
    },
    "BCELoss": {
      "size_average": false,
      "reduce": false,
      "reduction": "Mean"
    },
    "BCEWithLogitsLoss": {
      "size_average": false,
      "reduce": false,
      "reduction": "Mean"
    },
    "MSELoss": {
      "size_average": false,
      "reduce": false,
      "reduction": "Mean"
    },
    "L1Loss": {
      "size_average": false,
      "reduce": false,
      "reduction": "Mean"
    }
  },
  "optimizer": "Adam",
  "optimizersData": {
    "Adam": {
      "lr": 0.001,
      "betas": [
        0.9,
        0.999
      ],
      "eps": 1e-8,
      "weight_decay": 0,
      "amsgrad": false
    },
    "SDG": {
      "lr": 0.001,
      "momentum": 0,
      "weight_decay": 0,
      "dampening": 0,
      "nesterov": false
    },
    "RMSprop": {
      "lr": 0.01,
      "alpha": 0.99,
      "eps": 1e-8,
      "weight_decay": 0,
      "momentum": 0,
      "centered": false
    },
    "Adagrad": {
      "lr": 0.01,
      "lr_decay": 0,
      "weight_decay": 0,
      "initial_accumulator": 0
    },
    "NAdam": {
      "lr": 0.002,
      "betas": [
        0.9,
        0.999
      ],
      "eps": 1e-8,
      "weight_decay": 0
    }
  },
  "metrics": [
    "MeanAbsoluteError"
  ],
  "metricsData": {
    "Accuracy": {
      "task": "multiclass",
      "threshold": 0.5,
      "average": "none"
    },
    "F1Score": {
      "task": "multiclass",
      "threshold": 0.5,
      "average": "none"
    },
    "Recall": {
      "task": "multiclass",
      "threshold": 0.5,
      "average": "none"
    },
    "MeanAbsoluteError": {
      "num_outputs": 1
    }
  },
  "lrSchedular": "ReduceLROnPlateau",
  "lrSchedularsData": {
    "ReduceLROnPlateau": {
      "patience": 10,
      "factor": 0.1,
      "mode": "min",
      "threshold": 0.0001
    }
  },
  "monitoring": [
    "use_tensorboard",
    "use_mlflow"
  ],
  "trainingHyperParameters": {
    "batch_size": 32,
    "learning_rate": 0.1,
    "epochs": 10,
    "weight_decay": 0
  },
  "earlyStopping": {
    "patience": 5,
    "monitor": "val_loss",
    "verbose": false,
    "restore_best_weights": true
  },
  "dataLoading": "    self.label_map = label_map or self._infer_label_map()\n    self.data = self._load_data()\n  \n  def _infer_label_map(self):\n    classes = sorted([d.name for d in self.root.iterdir() if d.is_dir()])\n    return {cls: idx for idx, cls in enumerate(classes)}\n  \n  def _load_data(self):\n    items = []\n    for cls in self.label_map:\n        for img_path in (self.root / cls).glob('*.jpg'):\n            items.append((img_path, self.label_map[cls]))\n    return items\n  \n  def __len__(self):\n    return len(self.data)\n  \n  def __getitem__(self, idx):\n    img_path, label = self.data[idx]\n    image = Image.open(img_path).convert(\"RGB\")\n  \n    for transform in self.transforms:\n        image = transform(image)\n  \n    if self.return_format == 'tuple':\n        return image, label\n    elif self.return_format == 'raw':\n        return image\n    else:\n        return {'image': image, 'label': label}"
}