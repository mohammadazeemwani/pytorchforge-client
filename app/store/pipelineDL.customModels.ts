import * as z from "zod/v4"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { pipelineDLCustomModelsSchema } from "~/schema/pipelineDL"
import type { PipelineDLCustomModelsStoreAction } from "~/types/pipelineDL.customModels"

export const usePipelineDLCustomModels = create<{
  pretrainedModels: z.infer<typeof pipelineDLCustomModelsSchema>,
  actions: PipelineDLCustomModelsStoreAction
}>()(
  immer((set) => ({
    pretrainedModels: pipelineDLCustomModelsSchema.parse({}),
    actions: {
      updateCustomModel(customModel, prop, value) {
        set((state) => {
          (state.pretrainedModels[customModel] as any)[prop] = value;
        })
      },
      resetCustomModel(customModel) {
        set((state) => {
          const pretrainedModelSchema = pipelineDLCustomModelsSchema.shape[customModel];
          state.pretrainedModels[customModel] = pretrainedModelSchema.parse({}) as any;        
        })
      }
    },
  })),
)