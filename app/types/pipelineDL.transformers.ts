import * as z from 'zod/v4'
import { pipelineDLTransformersSchema } from '~/schema/pipelineDL'
export type PipelineDLTransformers = z.infer<typeof pipelineDLTransformersSchema>
import type { Transformers } from './pipelineDL'

type MainTask = keyof PipelineDLTransformers
export type PipelineDL_Transformers_StoreAction = {
    /**
     * @description for the above added 'abc', we will now update the value of some of its property.
     * - It is actually **updateTransformerProp** < to make more sense.
     */
    updateTransformer:(
      transformer: Transformers[number], 
      prop: Transformers[number],
      value: TransformersProps[T][PropName]
    ) => void
    /**
     * description will remove given transformer from the state.
     */
    removeTransformer: <T extends MainTask>(mainTask: T, transformer: Transformers<T>) => void;
    /**
     * description: It will reset the props of given transformer to the default / initial
     */
    resetTransformer: <T extends MainTask>(mainTask: T, transformer: Transformers<T>) => void;
  
}