import React from "react";
import type { UseFormReturn } from "react-hook-form";
import type { PipelineDL } from "~/types/pipelineDL";
import { cn } from "~/utils/general";

import { 
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "~/components/Form";

type ConvolutionFirstFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function ConvolutionFirstField({ className, form, ...delegated}: ConvolutionFirstFieldProps) {
  return (
    <FormField
      control={form.control}
      name="pretrainedModelsData.Conformer.convolution_first"
      render={({ field }) => (
        <FormItem className={cn('flex gap-2 items-center', className)} {...delegated}>
          <FormLabel>Convolution First</FormLabel>
          <FormControl>
            <input 
              type="checkbox" 
              className="checkbox scale-[0.8]" 
              checked={field.value} 
              onChange={field.onChange} 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}