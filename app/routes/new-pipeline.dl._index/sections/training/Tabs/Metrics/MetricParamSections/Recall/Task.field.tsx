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
import { getAllowedMetricTasks } from "~/helpers/pipelineDL";

type TaskFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function TaskField({ className, form, ...delegated}: TaskFieldProps) {
  const allowedMetricTasks = getAllowedMetricTasks()
  
  return (
    <FormField
      control={form.control}
      name="metricsData.Recall.task"
      render={({ field }) => (
        <FormItem className={cn('', className)} {...delegated}>
          <FormLabel>Task</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select task" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {allowedMetricTasks.map((metricTask, i) => (
                <SelectItem key={i} value={metricTask}>
                  {metricTask}
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