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


type NewFreqFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function NewFreqField({
  className,
  form,
  ...delegated
}: NewFreqFieldProps) {
  return (
    <FormField
      control={form.control}
      name="transformersData.Resample.new_freq"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>New Frequency</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
