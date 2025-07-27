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

  // schema for this very step
  const schemaNonDiscriminated = pipelineDLSchema.def.left.pick({
    loss: true,
    lossesData: true,

    optimizer: true,
    optimizersData: true,

    metrics: true,
    metricsData: true,

    lrSchedular: true,
    lrSchedularsData: true,

    monitoring: true,
    trainingHyperParameters: true,
    earlyStopping: true
  });

  // metric schema
  const selectedMetrics = form.getValues('metrics');
  const allowedMetricsDataEntries = objectEntries(schemaNonDiscriminated.shape.metricsData.shape).filter(e => {
    return selectedMetrics.includes(e[0])
  })
  
  const metricsSchema = z.object({
    metrics: schemaNonDiscriminated.shape.metrics,
    metricsData: z.object(objectFromEntries(allowedMetricsDataEntries))
  })


  // restForm schema (these are merged, cz they can be)
  // this doesn't and shouldn't include metrics and metricsData
  const restFormSchema = pipelineDLSchema.def.left.pick({
    loss: true,
    lossesData: true,

    optimizer: true,
    optimizersData: true,

    lrSchedular: true,
    lrSchedularsData: true,

    monitoring: true,
    trainingHyperParameters: true,
    earlyStopping: true
  });

  const stepSchema = restFormSchema.and(metricsSchema)

  const data = form.getValues()
  const result = stepSchema.safeParse(data);

  return result;
}