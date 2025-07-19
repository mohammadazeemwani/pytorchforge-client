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

type LogMelsFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function LogMelsField({ className, form, ...delegated}: LogMelsFieldProps) {
  return (
    <FormField
      control={form.control}
      name="transformersData.MFCC.log_mels"
      render={({ field }) => (
        <FormItem className={cn('flex gap-2 items-center', className)} {...delegated}>
          <FormLabel>Log</FormLabel>
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