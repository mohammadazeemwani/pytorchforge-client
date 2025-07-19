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
import { Input } from "~/components/Input";

type InputTypeFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function InputTypeField({ 
  className, 
  form,
  ...delegated
}: InputTypeFieldProps) {

  return (
    <FormField
      control={form.control}
      name="pretrainedModelsData.Wave2Letter.input_type"
      render={({ field }) => (
        <FormItem className={cn('', className)} {...delegated}>
          <FormLabel>Input type</FormLabel>
          <FormControl>
            <Input {...field}/>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}