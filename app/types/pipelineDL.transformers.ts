import * as z from 'zod/v4'
import { pipelineDLTransformersSchema } from '~/schema/pipelineDL'
type Transformers = z.infer<typeof pipelineDLTransformersSchema>

export type PipelineDLTransformersStoreAction = {
    /**
     * @description for the above added 'abc', we will now update the value of some of its property.
     * - It is actually **updateTransformerProp** < to make more sense.
     */
    updateTransformer:
    <
      T extends keyof Transformers,
      PropName extends keyof Transformers[T]
    >(
      transformer: T, 
      prop: PropName,
      value: Transformers[T][PropName],
    ) => void
    /**
     * description: It will reset the props of given transformer to the default / initial
     */
    resetTransformer: (transformer: keyof Transformers) => void;
  
}