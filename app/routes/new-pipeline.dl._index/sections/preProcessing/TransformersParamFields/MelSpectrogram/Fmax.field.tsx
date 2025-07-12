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


type FmaxFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function FmaxField({ className, form, ...delegated }: FmaxFieldProps) {
  return (
    <FormField
      control={form.control}
      name="transformersData.MelSpectrogram.f_max"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Max frequency</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
