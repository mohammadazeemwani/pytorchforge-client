import React from "react";
import type { UseFormReturn } from "react-hook-form";
import type { PipelineDL } from "~/types/pipelineDL";
import { cn } from "~/utils/general";

import { 
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "~/components/Form";

type IIDMasksFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function IIDMasksField({ className, form, ...delegated}: IIDMasksFieldProps) {
  return (
    <FormField
      control={form.control}
      name="transformersData.FrequencyMasking.iid_masks"
      render={({ field }) => (
        <FormItem className={cn('flex gap-2 items-center', className)} {...delegated}>
          <FormLabel>IID masks</FormLabel>
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