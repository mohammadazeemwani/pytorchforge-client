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


type WeightDecayFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function WeightDecayField({ className, form, ...delegated }: WeightDecayFieldProps) {
  return (
    <FormField
      control={form.control}
      name="optimizersData.RMSprop.weight_decay"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Weight decay</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
