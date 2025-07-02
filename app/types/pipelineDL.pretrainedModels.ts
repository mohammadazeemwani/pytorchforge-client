import * as z from 'zod/v4'
import { pipelineDLPretrainedModelsSchema } from '~/schema/pipelineDL'
type PretrainedModels = z.infer<typeof pipelineDLPretrainedModelsSchema>

export type PipelineDLPretrainedModelsStoreAction = {
    /**
     * @description for the above added 'abc', we will now update the value of some of its property.
     * - It is actually **updateCustomModelProp** < to make more sense.
     */
    updatePretrainedModel:
    <
      P extends keyof PretrainedModels,
      PropName extends keyof PretrainedModels[P]
    >(
      pretrainedModel: P, 
      prop: PropName,
      value: PretrainedModels[P][PropName],
    ) => void
    /**
     * description: It will reset the props of given transformer to the default / initial
     */
    resetPretrainedModel: (pretrainedModel: keyof PretrainedModels) => void;
  
}