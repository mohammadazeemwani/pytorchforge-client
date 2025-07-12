import * as z from "zod/v4"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { pipelineDLTransformersSchema } from "~/schema/pipelineDL"
import type { PipelineDLTransformersStoreAction } from "~/types/pipelineDL.transformers"

export const usePipelineDLTransformers = create<{
  transformers: z.infer<typeof pipelineDLTransformersSchema>,
  actions: PipelineDLTransformersStoreAction
}>()(
  immer((set) => ({
    transformers: pipelineDLTransformersSchema.parse({}),
    actions: {
      updateTransformer(transformer, prop, value) {
        set((state) => {
          (state.transformers[transformer] as any)[prop] = value;
        })
      },
      resetTransformer(transformer) {
        set((state) => {
          const transformerSchema = pipelineDLTransformersSchema.shape[transformer];
          state.transformers[transformer] = transformerSchema.parse({}) as any;        
        })
      }
    },
  })),
)