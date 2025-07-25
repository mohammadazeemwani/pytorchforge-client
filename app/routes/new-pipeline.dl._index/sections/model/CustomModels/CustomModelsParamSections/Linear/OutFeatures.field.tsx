import React from "react";
import type { UseFormReturn } from "react-hook-form";
import type { PipelineDL } from "~/types/pipelineDL";
import { cn } from "~/utils/general";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/Form"
import { InputNumberArray } from "~/components/InputNumberArray";

type OutFeaturesFieldProps = {
  form: UseFormReturn<PipelineDL>,
  index: number
} & React.ComponentProps<'div'>

export function OutFeaturesField({ 
  className, 
  form,
  index,
  ...delegated
}: OutFeaturesFieldProps) {
  
  return (
    <FormField
      control={form.control}
      name={`customModels.${index}.props.out_features`}
      render={({ field }) => (
        <FormItem className={cn('', className)} {...delegated}>
          <FormLabel>Out features</FormLabel>
          <InputNumberArray
            field={field}
            placeholder="800, 600, 3"
            helperText="Enter numbers separated by commas (e.g., 800, 600, 3)"
          />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}