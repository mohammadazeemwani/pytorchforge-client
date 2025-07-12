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

type BeginFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function BeginField({ 
  className, 
  form,
  ...delegated
}: BeginFieldProps) {

  return (
    <FormField
      control={form.control}
      name="transformersData.AddToken.begin"
      render={({ field }) => (
        <FormItem className={cn('flex gap-2 items-center', className)} {...delegated}>
          <FormLabel>Begin</FormLabel>
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