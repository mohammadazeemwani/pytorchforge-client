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
import { getAllowedReduction } from "~/helpers/pipelineDL";

type ReductionFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function ReductionField({ className, form, ...delegated}: ReductionFieldProps) {
  const allowedReduction = getAllowedReduction()
  
  return (
    <FormField
      control={form.control}
      name="lossesData.CrossEntropyLoss.reduction"
      render={({ field }) => (
        <FormItem className={cn('', className)} {...delegated}>
          <FormLabel>Reduction</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select reduction" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {allowedReduction.map((reduction, i) => (
                <SelectItem key={i} value={reduction}>
                  {reduction}
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