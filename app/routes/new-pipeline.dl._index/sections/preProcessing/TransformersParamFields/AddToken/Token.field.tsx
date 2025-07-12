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
import { InputStringArray } from "~/components/InputStringArray";

type TokenFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function TokenField({ 
  className, 
  form,
  ...delegated
}: TokenFieldProps) {

  return (
    <FormField
      control={form.control}
      name="transformersData.AddToken.token"
      render={({ field }) => (
        <FormItem className={cn('', className)} {...delegated}>
          <FormLabel>Token</FormLabel>
          <InputStringArray
            field={field}
            placeholder="str1, str2"
            helperText="Enter strings separated by commas"
          />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}