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

type NameFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function NameField({ 
  className, 
  form,
  ...delegated
}: NameFieldProps) {

  return (
    <FormField
      control={form.control}
      name="pretrainedModelsData.GloVe.name"
      render={({ field }) => (
        <FormItem className={cn('', className)} {...delegated}>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input {...field}/>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}