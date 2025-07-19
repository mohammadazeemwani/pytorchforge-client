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

type DeviceFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function DeviceField({ 
  className, 
  form,
  ...delegated
}: DeviceFieldProps) {

  return (
    <FormField
      control={form.control}
      name="pretrainedModelsData.Transformer.device"
      render={({ field }) => (
        <FormItem className={cn('', className)} {...delegated}>
          <FormLabel>Device</FormLabel>
          <FormControl>
            <Input {...field}/>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}