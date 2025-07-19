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


type SharpnessFactorFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function SharpnessFactorField({
  className,
  form,
  ...delegated
}: SharpnessFactorFieldProps) {
  return (
    <FormField
      control={form.control}
      name="transformersData.RandomAdjustSharpness.sharpness_factor"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Sharpness Factor</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
