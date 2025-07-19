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


type WinLengthFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function WinLengthField({
  className,
  form,
  ...delegated
}: WinLengthFieldProps) {
  return (
    <FormField
      control={form.control}
      name="transformersData.Spectrogram.win_length"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Window Length</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
