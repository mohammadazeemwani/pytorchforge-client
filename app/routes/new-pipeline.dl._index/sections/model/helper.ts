import type { UseFormReturn } from "react-hook-form"
import { objectEntries, objectFromEntries } from "ts-extras"
import { z } from "zod/v4"
import { pipelineDLSchema } from "~/schema/pipelineDL"
import type { PipelineDL } from "~/types/pipelineDL"

type isGoodToGoProps = {
  form: UseFormReturn<PipelineDL>
}
/**
 * 
 * @param form Form instnace of zod
 * @returns boolean to state weather this step is good to go or not.
 */
export function isGoodToGo({ form }: isGoodToGoProps) {
  // This will like get the value and is reactive too..
  const mainTask = form.watch('mainTask')

  // schema for this very step
  const schemaNonDiscriminated = pipelineDLSchema.def.left.pick({
    usePreTrained: true,
    customModels: true,
    pretrainedModelsData: true,
    customModelsData: true
  });
  const schemaDiscriminatedVariant = pipelineDLSchema.def.right.options.find(
    (opt) => opt.shape.mainTask.value === mainTask
  )


  // schema for preTrained and custom models discriminated on basis of usePreTrained
  const preTrainedModelSchema = z.object({
    usePreTrained: z.literal(true),
    pretrainedModel: schemaDiscriminatedVariant!.shape.pretrainedModel,
    pretrainedModelsData: schemaNonDiscriminated.shape.pretrainedModelsData,
  });

  // ----- custom model schema
  const selectedCustomModels = form.getValues('customModels');
  const allowedCustomModelsDataEntries = objectEntries(schemaNonDiscriminated.shape.customModelsData.shape).filter(e => {
    return selectedCustomModels?.includes(e[0])
  })
  const customModelsSchema = z.object({
    usePreTrained: z.literal(false),
    customModels: schemaNonDiscriminated.shape.customModels,
    customModelsData: z.object(objectFromEntries(allowedCustomModelsDataEntries)),
  });


  const stepSchema = z.discriminatedUnion('usePreTrained', [
    preTrainedModelSchema,
    customModelsSchema
  ])

  const data = form.getValues()
  const result = stepSchema.safeParse(data);

  return result;
}