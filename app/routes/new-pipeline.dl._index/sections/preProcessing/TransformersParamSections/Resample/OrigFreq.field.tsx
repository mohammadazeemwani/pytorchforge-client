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


type OrigFreqFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function OrigFreqField({
  className,
  form,
  ...delegated
}: OrigFreqFieldProps) {
  return (
    <FormField
      control={form.control}
      name="transformersData.Resample.orig_freq"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Original Frequency</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
