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


type LowpassFilterWidthFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function LowpassFilterWidthField({
  className,
  form,
  ...delegated
}: LowpassFilterWidthFieldProps) {
  return (
    <FormField
      control={form.control}
      name="transformersData.Resample.lowpass_filter_width"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Lowpass filter width</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
