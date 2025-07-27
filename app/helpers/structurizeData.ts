import type { DeepPartial } from "react-hook-form";
import type { PipelineDL } from "~/types/pipelineDL";

/**
 * This will follow the spec from API.
 * Schema format to be adhered as per `architecture/pipelineDL.schema.md`
 */
export function structurizePipelineDLFormData(data: DeepPartial<PipelineDL>) {
  const result =  {
    task_type: 'dl',
    main_task: data.mainTask,
    sub_task: data.subTask,
    data_format: data.dataFormat,
    data_source: {
      type: data.dataSource!.type,
      value: data.dataSource!.value
    },
    dataloading: data.dataLoading,
    preprocessing: data.transformers?.map(t => ({
      name: t,
      params: data.transformersData![t!]
    })),
    model: {
      use_pretrained: data.usePreTrained,
      pretrained: data.usePreTrained 
        ? {
          name: data.pretrainedModel,
          params: data.pretrainedModelsData![data.pretrainedModel!]
        }
        : undefined,
      layers: !data.usePreTrained 
        ? data.customModels!.map(layer => ({
          type: layer!.name,
          params: layer!.props
        })) 
        : undefined,
    },
    training: {
      loss: {
        name: data.loss,
        params: data.lossesData![data.loss!]
      },
      optimizer: {
        name: data.optimizer,
        params: data.optimizersData![data.optimizer!]
      },
      metrics: data.metrics!.map(metric => ({
        name: metric,
        params: data.metricsData![metric!]
      })),
      scheduler: {
        name: data.lrSchedular,
        params: data.lrSchedularsData![data.lrSchedular!]
      },
      monitoring: data.monitoring,
      hyper_params: {
        batch_size: data.trainingHyperParameters!.batch_size,
        learning_rate: data.trainingHyperParameters!.learning_rate,
        epochs: data.trainingHyperParameters!.epochs,
        weight_decay: data.trainingHyperParameters!.weight_decay,
      },
      early_stopping: {
        enabled: true,
        params: data.earlyStopping
      }
    }
  }

  return result
}