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

type ModeFieldProps = {
  form: UseFormReturn<PipelineDL>,
  index: number
} & React.ComponentProps<'div'>

export function ModeField({ className, form, index, ...delegated}: ModeFieldProps) {
  const allowedInterpolation = getAllowedInterpolation()
  
  return (
    <FormField
      control={form.control}
      name={`customModels.${index}.props.mode`}
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