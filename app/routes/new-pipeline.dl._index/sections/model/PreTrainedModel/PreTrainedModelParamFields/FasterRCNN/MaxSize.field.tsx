import React from "react"
import { cn } from "~/utils/general"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/Form"
import type { UseFormReturn } from "react-hook-form"
import type { PipelineDL } from "~/types/pipelineDL"
import { InputNumber } from "~/components/InputNumber";


type MaxSizeFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function MaxSizeField({ className, form, ...delegated }: MaxSizeFieldProps) {
  return (
    <FormField
      control={form.control}
      name="pretrainedModelsData.FasterRCNN.max_size"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Maximum size</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
