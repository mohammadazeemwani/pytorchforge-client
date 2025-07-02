import * as z from "zod/v4"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { pipelineDLPretrainedModelsSchema } from "~/schema/pipelineDL"
import type { PipelineDLPretrainedModelsStoreAction } from "~/types/pipelineDL.pretrainedModels"

export const usePipelineDLPretrainedModels = create<{
  pretrainedModels: z.infer<typeof pipelineDLPretrainedModelsSchema>,
  actions: PipelineDLPretrainedModelsStoreAction
}>()(
  immer((set) => ({
    pretrainedModels: pipelineDLPretrainedModelsSchema.parse({}),
    actions: {
      updatePretrainedModel(pretrainedModel, prop, value) {
        set((state) => {
          (state.pretrainedModels[pretrainedModel] as any)[prop] = value;
        })
      },
      resetPretrainedModel(pretrainedModel) {
        set((state) => {
          const pretrainedModelSchema = pipelineDLPretrainedModelsSchema.shape[pretrainedModel];
          state.pretrainedModels[pretrainedModel] = pretrainedModelSchema.parse({}) as any;        
        })
      }
    },
  })),
)