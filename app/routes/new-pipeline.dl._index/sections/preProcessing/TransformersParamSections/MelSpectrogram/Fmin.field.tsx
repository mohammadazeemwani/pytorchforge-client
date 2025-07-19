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


type FminFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function FminField({ className, form, ...delegated }: FminFieldProps) {
  return (
    <FormField
      control={form.control}
      name="transformersData.MelSpectrogram.f_min"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Min frequency</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
