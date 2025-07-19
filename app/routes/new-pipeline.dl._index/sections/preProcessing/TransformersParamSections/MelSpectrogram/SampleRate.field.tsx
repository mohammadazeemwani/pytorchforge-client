import React from "react"
import type { UseFormReturn } from "react-hook-form"
import type { PipelineDL } from "~/types/pipelineDL"
import { cn } from "~/utils/general"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/Form"
import { InputNumber } from "~/components/InputNumber";


type SampleRateFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function SampleRateField({
  className,
  form,
  ...delegated
}: SampleRateFieldProps) {
  return (
    <FormField
      control={form.control}
      name="transformersData.MelSpectrogram.sample_rate"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Sample rate</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
