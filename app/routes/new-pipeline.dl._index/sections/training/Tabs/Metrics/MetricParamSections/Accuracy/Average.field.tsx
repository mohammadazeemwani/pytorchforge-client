import React from "react";
import type { UseFormReturn } from "react-hook-form";
import type { PipelineDL } from "~/types/pipelineDL";
import { cn } from "~/utils/general";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/Select"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/Form"
import { getAllowedMetricAverage } from "~/helpers/pipelineDL";

type AverageFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function AverageField({ className, form, ...delegated}: AverageFieldProps) {
  const allowedMetricAverage = getAllowedMetricAverage()
  
  return (
    <FormField
      control={form.control}
      name="metricsData.Accuracy.average"
      render={({ field }) => (
        <FormItem className={cn('', className)} {...delegated}>
          <FormLabel>Average</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select average" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {allowedMetricAverage.map((metricAverage, i) => (
                <SelectItem key={i} value={metricAverage}>
                  {metricAverage}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />    
  )
}