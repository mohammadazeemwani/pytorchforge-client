import * as z from "zod/v4"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { pipelineDLSchema } from "~/schema/pipelineDL"
import type { PipelineDL, PipelineDL_StoreAction } from "~/types/pipelineDL"
import type { MainTask, Transformers } from "~/types/pipelineDL"
import { getDefaultPipelineDLSchema } from "~/helpers/pipelineDL"

export const defaultMainTask = 'image'
export const usePipelineDLStore = create<{
  pipeline: PipelineDL
  actions: PipelineDL_StoreAction
}>()(
  immer((set, get) => ({
    pipeline: getDefaultPipelineDLSchema(defaultMainTask),
    actions: {
      // --------------------------------------- GENERIC
      setTask(mainTask) {
        /** The set function merges state at only one level */
        set((state) => {
          state.pipeline = getDefaultPipelineDLSchema(mainTask)
        })
      },
      setSubTask(subTask) {
        const mainTask = get().pipeline.mainTask;
        const result = pipelineDLSchema.safeParse({ mainTask, subTask });
        
        if (!result.success) {
          throw new Error(`Invalid combination: ${mainTask} + ${subTask}`)
        }
        
        set((state) => {
          state.pipeline.subTask = subTask;
        });
      },
      setDataFormat(dataFormat) {
        const mainTask = get().pipeline.mainTask;
        const result = pipelineDLSchema.safeParse({ mainTask, dataFormat });
        
        if (!result.success) {
          throw new Error(`Invalid combination: ${mainTask} + ${dataFormat}`)
        }
        set((state) => {
          state.pipeline.dataFormat = dataFormat
        })
      },

      setDataFormatPicker(data) {
        set((state) => {
          state.pipeline.dataFormatPicker = data;
        }) 
      },
      //--------------------------------- TRANSFORMERS ---------------------------------------
      setTransformers(transformers) {
        const mainTask = get().pipeline.mainTask;
        const result = pipelineDLSchema.safeParse({ mainTask, transformers });
        
        if (!result.success) {
          throw new Error(`Invalid combination: ${mainTask} + ${transformers}`)
        }
        set((state) => {
          state.pipeline.transformers = transformers
        })
      },

      //--------------------------------- PRE_TRAINED MODELS ---------------------------------------
      setPretrainedModels(pretrainedModels) {
        const mainTask = get().pipeline.mainTask;
        const result = pipelineDLSchema.safeParse({ mainTask, pretrainedModels });
        
        if (!result.success) {
          throw new Error(`Invalid combination: ${mainTask} + ${pretrainedModels}`)
        }
        set((state) => {
          state.pipeline.pretrainedModels = pretrainedModels
        })
      },

      //--------------------------------- CUSTOM MODELS ---------------------------------------
      setCustomModels(customModels) {
        const mainTask = get().pipeline.mainTask;
        const result = pipelineDLSchema.safeParse({ mainTask, customModels });
        
        if (!result.success) {
          throw new Error(`Invalid combination: ${mainTask} + ${customModels}`)
        }
        set((state) => {
          state.pipeline.customModels = customModels
        })
      },

      //--------------------------------- LOSSES ---------------------------------------
      /**
       * @param loss the loss to add.
       * This will add the loss to the losses object with default configuration
       */
      addLoss(loss) {
        set((state) => {
          state.pipeline.losses[loss] = pipelineDLSchema.parse({}).losses[loss]
        })
      },
      updateLoss(loss, prop, value) {
        set((state) => {
          (state.pipeline.losses[loss] as any)[prop] = value
        })
      },
      removeLoss(loss) {
        set((state) => {
          delete state.pipeline.losses[loss]
        })
      },
      resetLoss(loss) {
        set((state) => {
          state.pipeline.losses[loss] = pipelineDLSchema.parse({}).losses[loss]
        })
      },

      //--------------------------------- OPTIMIZERS ---------------------------------------
      addOptimizer(optimizer) {
        set((state) => {
          state.pipeline.optimizers[optimizer] = pipelineDLSchema.parse({}).optimizers[optimizer] as any;
        })
      },
      updateOptimizer(optimizer, prop, value) {
        set((state) => {
          (state.pipeline.optimizers[optimizer] as any)[prop] = value
        })
      },
      removeOptimizer(optimizer) {
        set((state) => {
          delete state.pipeline.optimizers[optimizer]
        })
      },
      resetOptimizer(optimizer) {
        set((state) => {
          state.pipeline.optimizers[optimizer] = pipelineDLSchema.parse({}).optimizers[optimizer] as any;
        })
      },

      //--------------------------------- MONITORING ---------------------------------------
      addMonitoring(monitoring) {
        set((state) => {
          state.pipeline.monitoring.push(monitoring)
        })
      },
      removeMonitoring(monitoring) {
        set((state) => {
          const prev = state.pipeline.monitoring;
          state.pipeline.monitoring = prev.filter(m => m!== monitoring)
        })
      },
      resetMonitoring(monitoring) {
        set((state) => {
          state.pipeline.monitoring = pipelineDLSchema.parse({}).monitoring;
        })
      },

      //--------------------------------- METRICS ---------------------------------------
      addMetric(metric) {
        set((state) => {
          state.pipeline.metrics[metric] = pipelineDLSchema.parse({}).metrics[metric] as any;
        })
      },
      updateMetric(metric, prop, value) {
        set((state) => {
          (state.pipeline.metrics[metric] as any)[prop] = value
        })
      },
      removeMetric(metric) {
        set((state) => {
          delete state.pipeline.metrics[metric]
        })
      },
      resetMetric(metric) {
        set((state) => {
          state.pipeline.metrics[metric] = pipelineDLSchema.parse({}).metrics[metric] as any;
        })
      },

      //--------------------------------- EARLY_STOPPING ---------------------------------------
      updateEarlyStopping(prop, value) {
        set((state) => {
          state.pipeline.earlyStopping[prop] = value
        })
      },
      resetEarlyStopping() {
        set((state) => {
          state.pipeline.earlyStopping = pipelineDLSchema.parse({}).earlyStopping
        })
      },

      //--------------------------------- LR_SCHEDULAR ---------------------------------------
      addLrSchedular(schedular) {
        set((state) => {
          state.pipeline.lrSchedular[schedular] = pipelineDLSchema.parse({}).lrSchedular[schedular]
        })
      },
      updateLrSchedular(schedular, prop, value) {
        set((state) => {
          (state.pipeline.lrSchedular[schedular] as any)[prop] = value
        })
      },
      removeLrSchedular(schedular) {
        set((state) => {
          delete state.pipeline.lrSchedular[schedular]
        })
      },
      resetLrSchedular(schedular) {
        set((state) => {
          state.pipeline.lrSchedular[schedular] = pipelineDLSchema.parse({}).lrSchedular[schedular]
        })
      },
    },
  })),
)
