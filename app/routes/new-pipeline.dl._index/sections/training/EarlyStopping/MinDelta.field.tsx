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


type MinDeltaFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function MinDeltaField({ className, form, ...delegated }: MinDeltaFieldProps) {
  return (
    <FormField
      control={form.control}
      name="earlyStopping.min_delta"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Minimum delta</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
