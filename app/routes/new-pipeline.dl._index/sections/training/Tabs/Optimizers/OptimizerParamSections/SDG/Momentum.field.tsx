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


type MomentumFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function MomentumField({ className, form, ...delegated }: MomentumFieldProps) {
  return (
    <FormField
      control={form.control}
      name="optimizersData.SDG.momentum"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Momentum</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
