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

type WeightFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function WeightField({ 
  className, 
  form,
  ...delegated
}: WeightFieldProps) {
  
  return (
    <FormField
      control={form.control}
      name="lossesData.BCELoss.weight"
      render={({ field }) => (
        <FormItem className={cn('', className)} {...delegated}>
          <FormLabel>Weight</FormLabel>
          <InputNumberArray
            field={field}
            placeholder="0.3, 0.7"
            helperText="manual rescale weight given to each class eg: [0.3, 0.7]"
          />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}