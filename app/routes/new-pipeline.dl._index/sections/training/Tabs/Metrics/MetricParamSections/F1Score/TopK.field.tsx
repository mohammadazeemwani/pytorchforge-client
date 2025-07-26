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


type TopKFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function TopKField({ className, form, ...delegated }: TopKFieldProps) {
  return (
    <FormField
      control={form.control}
      name="metricsData.F1Score.top_k"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Top-K</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
