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
import { getAllowedInterpolation } from "~/helpers/pipelineDL";

type InterpolationFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function InterpolationField({ className, form, ...delegated}: InterpolationFieldProps) {
  const allowedInterpolation = getAllowedInterpolation()
  
  return (
    <FormField
      control={form.control}
      name="transformersData.Resize.interpolation"
      render={({ field }) => (
        <FormItem className={cn('', className)} {...delegated}>
          <FormLabel>Interpolation</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select interpolation" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {allowedInterpolation.map((interpolation, i) => (
                <SelectItem key={i} value={interpolation}>
                  {interpolation}
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