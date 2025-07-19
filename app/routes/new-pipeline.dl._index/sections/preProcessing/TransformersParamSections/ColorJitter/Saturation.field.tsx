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


type SaturationFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function SaturationField({
  className,
  form,
  ...delegated
}: SaturationFieldProps) {
  return (
    <FormField
      control={form.control}
      name="transformersData.ColorJitter.saturation"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Saturation</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
