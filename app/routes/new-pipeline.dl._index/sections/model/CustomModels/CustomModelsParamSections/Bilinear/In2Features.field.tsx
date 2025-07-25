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

type In2FeaturesFieldProps = {
  form: UseFormReturn<PipelineDL>,
  index: number
} & React.ComponentProps<'div'>

export function In2FeaturesField({ 
  className, 
  form,
  index,
  ...delegated
}: In2FeaturesFieldProps) {
  
  return (
    <FormField
      control={form.control}
      name={`customModels.${index}.props.in2_features`}
      render={({ field }) => (
        <FormItem className={cn('', className)} {...delegated}>
          <FormLabel>Input 2 Feature Size</FormLabel>
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
