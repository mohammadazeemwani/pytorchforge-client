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


type WidthMultFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function WidthMultField({ className, form, ...delegated }: WidthMultFieldProps) {
  return (
    <FormField
      control={form.control}
      name="pretrainedModelsData.EfficientNet.width_mult"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Width multiplier</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
