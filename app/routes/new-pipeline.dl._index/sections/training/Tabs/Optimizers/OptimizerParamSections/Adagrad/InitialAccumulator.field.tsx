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


type InitialAccumulatorFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function InitialAccumulatorField({ className, form, ...delegated }: InitialAccumulatorFieldProps) {
  return (
    <FormField
      control={form.control}
      name="optimizersData.Adagrad.initial_accumulator"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Initial accumulator</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
