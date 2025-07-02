import * as z from "zod/v4"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { pipelineDLSchema } from "~/schema/pipelineDL"
import type { PipelineDL, PipelineDL_StoreAction } from "~/types/pipelineDL"
import type { MainTask, Transformers } from "~/types/pipelineDL"
import { getDefaultPipelineDLSchema } from "~/helpers/pipelineDL"

export const usePipelineDLStore = create<{
  pipeline: PipelineDL
  actions: PipelineDL_StoreAction
}>()(
  immer((set) => ({
    pipeline: getDefaultPipelineDLSchema("image"),
    actions: {
      // --------------------------------------- GENERIC
      setTask(mainTask) {
        /** The set function merges state at only one level */
        set((state) => {
          state.pipeline = getDefaultPipelineDLSchema(mainTask)
        })
      },
      setSubTask(mainTask, subTask) {
        const result = pipelineDLSchema.safeParse({ mainTask, subTask })
        if (!result.success) {
          throw new Error(
            `Invalid combination of current mainTask: ${mainTask} and provided subTask: ${subTask}`,
          )
        }
        set((state) => {
          state.pipeline.subTask = subTask
        })
      },
      setDataFormat(mainTask, dataFormat) {
        const result = pipelineDLSchema.safeParse({ mainTask, dataFormat })
        if (!result.success) {
          throw new Error(
            `Invalid combination of current mainTask: ${mainTask} and provided dataFormat: ${dataFormat}`,
          )
        }
        set((state) => {
          state.pipeline.dataFormat = dataFormat
        })
      },

      //--------------------------------- TRANSFORMERS ---------------------------------------
      setTransformers(transformers) {
        set((state) => {
          const mainTask = state.pipeline.mainTask
          const result = pipelineDLSchema.safeParse({ mainTask, transformers })
          if (!result.success) {
            throw new Error(
              `Invalid transformers: ${transformers} for current mainTask: ${mainTask}`,
            )
          }
          state.pipeline.transformers = transformers
        })
      },
      // updateTransformer(mainTask, transformer, prop, value) {

      // },
      // removeTransformer(mainTask, transformer) {

      // },
      // resetTransformer(mainTask, transformer) {

      // },

      //--------------------------------- PRE_TRAINED MODELS ---------------------------------------
      addPretrainedModel(mainTask, pretrainedModel) {},
      updatePretrainedModel(mainTask, pretrainedModel, prop, value) {},
      removePretrainedModel(mainTask, pretrainedModel) {},
      resetPretrainedModel(mainTask, pretrainedModel) {},

      //--------------------------------- CUSTOM MODELS ---------------------------------------
      addCustomModel(customModel) {},
      updateCustomModel(customModel, prop, value) {},
      removeCustomModel(customModel) {},
      resetCustomModel(customModel) {},

      //--------------------------------- LOSSES ---------------------------------------
      addLoss(loss) {},
      updateLoss(loss, prop, value) {},
      removeLoss(loss) {},
      resetLoss(loss) {},

      //--------------------------------- OPTIMIZERS ---------------------------------------
      addOptimizer(optimizer) {},
      updateOptimizer(optimizer, prop, value) {},
      removeOptimizer(optimizer) {},
      resetOptimizer(optimizer) {},

      //--------------------------------- MONITORING ---------------------------------------
      addMonitoring(monitoring) {},
      removeMonitoring(monitoring) {},
      resetMonitoring(monitoring) {},

      //--------------------------------- METRICS ---------------------------------------
      addMetric(metric) {},
      updateMetric(metric, prop, value) {},
      removeMetric(metric) {},
      resetMetric(metric) {},

      //--------------------------------- EARLY_STOPPING ---------------------------------------
      updateEarlyStopping(prop, value) {},
      resetEarlyStopping(prop) {},

      //--------------------------------- LR_SCHEDULAR ---------------------------------------
      addLrSchedular(option) {},
      updateLrSchedular(option, prop, value) {},
      removeLrSchedular(option) {},
      resetLrSchedular(option) {},
    },
  })),
)
