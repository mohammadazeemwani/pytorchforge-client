import * as z from 'zod/v4'
import { pipelineDLCustomModelsSchema } from '~/schema/pipelineDL'
type CustomModels = z.infer<typeof pipelineDLCustomModelsSchema>

export type PipelineDLCustomModelsStoreAction = {
    /**
     * @description for the above added 'abc', we will now update the value of some of its property.
     * - It is actually **updateCustomModelProp** < to make more sense.
     */
    updateCustomModel:
    <
      C extends keyof CustomModels,
      PropName extends keyof CustomModels[C]
    >(
      customModel: C, 
      prop: PropName,
      value: CustomModels[C][PropName],
    ) => void
    /**
     * description: It will reset the props of given transformer to the default / initial
     */
    resetCustomModel: (customModel: keyof CustomModels) => void;
  
}