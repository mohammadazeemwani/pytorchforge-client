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


type ThresholdFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function ThresholdField({ className, form, ...delegated }: ThresholdFieldProps) {
  return (
    <FormField
      control={form.control}
      name="lrSchedularsData.ReduceLROnPlateau.threshold"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Threshold</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
