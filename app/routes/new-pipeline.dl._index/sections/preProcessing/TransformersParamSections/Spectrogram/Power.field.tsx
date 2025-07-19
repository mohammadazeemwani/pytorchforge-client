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


type PowerFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function PowerField({ className, form, ...delegated }: PowerFieldProps) {
  return (
    <FormField
      control={form.control}
      name="transformersData.Spectrogram.power"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Power</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
