import React from "react";
import type { UseFormReturn } from "react-hook-form";
import type { PipelineDL } from "~/types/pipelineDL";
import { cn } from "~/utils/general";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/Form"
import { Input } from "~/components/Input";

type MaxLengthFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function MaxLengthField({ 
  className, 
  form,
  ...delegated
}: MaxLengthFieldProps) {

  return (
    <FormField
      control={form.control}
      name="transformersData.PadTransform.max_length"
      render={({ field }) => (
        <FormItem className={cn('', className)} {...delegated}>
          <FormLabel>Max length</FormLabel>
          <Input type="number" {...field}/>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}