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

type BackboneFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function BackboneField({ 
  className, 
  form,
  ...delegated
}: BackboneFieldProps) {

  return (
    <FormField
      control={form.control}
      name="pretrainedModelsData.MaskRCNN.backbone"
      render={({ field }) => (
        <FormItem className={cn('', className)} {...delegated}>
          <FormLabel>Backbone</FormLabel>
          <FormControl>
            <Input {...field}/>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}