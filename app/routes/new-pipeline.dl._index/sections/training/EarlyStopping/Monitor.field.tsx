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
import { getAllowedEarlyStoppingMonitors } from "~/helpers/pipelineDL";

type MonitorFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function MonitorField({ className, form, ...delegated}: MonitorFieldProps) {
  const allowedMonitors = getAllowedEarlyStoppingMonitors()
  
  return (
    <FormField
      control={form.control}
      name="earlyStopping.monitor"
      render={({ field }) => (
        <FormItem className={cn('', className)} {...delegated}>
          <FormLabel>Monitor</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select monitor" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {allowedMonitors.map((monitor, i) => (
                <SelectItem key={i} value={monitor}>
                  {monitor}
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