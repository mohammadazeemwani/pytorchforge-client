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


type PadFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function PadField({ className, form, ...delegated }: PadFieldProps) {
  return (
    <FormField
      control={form.control}
      name="transformersData.Spectrogram.pad"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Pad</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
