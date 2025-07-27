import type { UseFormReturn } from "react-hook-form"
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
    dataSource: true
  });

  const schemaDiscriminatedVariant = pipelineDLSchema.def.right.options.find(
    (opt) => opt.shape.mainTask.value === mainTask
  )
  const schemaDiscriminated = schemaDiscriminatedVariant!.pick({
    mainTask: true,
    subTask: true,
    dataFormat: true
  })

  const stepSchema = schemaNonDiscriminated.and(schemaDiscriminated)

  const data = form.getValues()
  const result = stepSchema.safeParse(data);
  return result;
}