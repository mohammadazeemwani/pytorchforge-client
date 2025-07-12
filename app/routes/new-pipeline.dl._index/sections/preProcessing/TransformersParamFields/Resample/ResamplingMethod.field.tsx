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
import { getAllowedResamplingMethod } from "~/helpers/pipelineDL";

type ResamplingMethodFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function ResamplingMethodField({ className, form, ...delegated}: ResamplingMethodFieldProps) {
  const allowedResamplingMethod = getAllowedResamplingMethod()
  
  return (
    <FormField
      control={form.control}
      name="transformersData.Resample.resampling_method"
      render={({ field }) => (
        <FormItem className={cn('', className)} {...delegated}>
          <FormLabel>Resampling method</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {allowedResamplingMethod.map((method, i) => (
                <SelectItem key={i} value={method}>
                  {method}
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