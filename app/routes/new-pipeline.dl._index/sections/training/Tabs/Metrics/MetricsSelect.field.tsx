import React from "react";
import { cn } from "~/utils/general";
import { getAllowedMetrics } from "~/helpers/pipelineDL";
import type { UseFormReturn } from "react-hook-form";
import type { PipelineDL } from "~/types/pipelineDL";
import { MultiSelect } from "~/components/MultiSelect";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/Form"


type MetricsSelectFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function MetricsSelectField({ className, form, ...delegated}: MetricsSelectFieldProps) {
  const metricsFullList = getAllowedMetrics()

  return (
    <FormField
      control={form.control}
      name="metrics"
      render={({ field }) => (
        <FormItem className={cn('', className)}  {...delegated}>
          <FormLabel>Metrics</FormLabel>
          <FormControl>
            <MultiSelect 
              options={metricsFullList.map(t => ({ value: t, label: t}))}
              defaultValue={field.value}
              onValueChange={field.onChange}
              animation={2}
              maxCount={3}
              placeholder="Select metrics"
              />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}