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

type MaxSeqLenFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function MaxSeqLenField({ 
  className, 
  form,
  ...delegated
}: MaxSeqLenFieldProps) {

  return (
    <FormField
      control={form.control}
      name="transformersData.Truncate.max_seq_len"
      render={({ field }) => (
        <FormItem className={cn('', className)} {...delegated}>
          <FormLabel>Max sequence length</FormLabel>
          <Input type="number" {...field}/>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}