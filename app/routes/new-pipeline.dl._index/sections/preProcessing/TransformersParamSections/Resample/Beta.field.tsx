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

type BetaFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function BetaField({ className, form, ...delegated }: BetaFieldProps) {
  return (
    <FormField
      control={form.control}
      name="transformersData.Resample.beta"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Beta</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
