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
    transformersData: true
  });
  const selectedTransformers = form.getValues('transformers')
  const allowedTransformersDataEntries = objectEntries(schemaNonDiscriminated.shape.transformersData.shape).filter(e => {
    return selectedTransformers.includes(e[0] as any)
  })

  const schemaDiscriminatedVariant = pipelineDLSchema.def.right.options.find(
    (opt) => opt.shape.mainTask.value === mainTask
  )
  const schemaDiscriminated = schemaDiscriminatedVariant!.pick({
    transformers: true,
  })

  const stepSchema = z.object({
    transformers: schemaDiscriminated.shape.transformers,
    transformersData: z.object(objectFromEntries(allowedTransformersDataEntries))
  })

  const data = form.getValues()
  const result = stepSchema.safeParse(data);

  return result;
}