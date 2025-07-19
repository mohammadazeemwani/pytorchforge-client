```json

{
  "data": {
    "data": {
      "task_type": "ml",
      "main_task": "",
      "sub_task": "",
      "data_format": "imagefolder",
      "data_type": "file",
      "preprocessing": [
        {
          "name": "",
          "params": {
            "ANY_ADDITIONAL_PROPERTY": "anything"
          }
        }
      ]
    },
    "dataloading": "iii....jflksdjfljskdfjljefwljrlkwe.....jlekwl",
    "model": {
      // ON SUBMIT, check if layers is an empty array, set layers to null.
      "use_pretrained": true,
      "pretrained": {
        "name": "",
        "params": {
          "ANY_ADDITIONAL_PROPERTY": "anything"
        }
      },
      // CUSTOM MODEL
      "layers": [
        {
          "type": "",
          "params": {
            "ANY_ADDITIONAL_PROPERTY": "anything"
          }
        }
      ]
    },
    "training": {
      "batch_size": 1,
      "learning_rate": 1,
      "epochs": 1,
      "weight_decay": 0,
      "optimizer": {
        "name": "",
        "params": {
          "ANY_ADDITIONAL_PROPERTY": "anything"
        }
      },
      "scheduler": {
        "name": "",
        "params": {
          "ANY_ADDITIONAL_PROPERTY": "anything"
        }
      },
      "loss": {
        "name": "",
        "params": {
          "ANY_ADDITIONAL_PROPERTY": "anything"
        }
      },
      "metrics": [
        {
          "name": "",
          "params": {
            "ANY_ADDITIONAL_PROPERTY": "anything"
          }
        }
      ],
      "early_stopping": {
        "enabled": true,
        "params": {
          "ANY_ADDITIONAL_PROPERTY": "anything"
        }
      }
    }
  },
  "base_path": "/home/haroon/REPOS/Backend/modules"
}

```