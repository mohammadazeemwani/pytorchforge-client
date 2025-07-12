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


type HopLengthFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function HopLengthField({
  className,
  form,
  ...delegated
}: HopLengthFieldProps) {
  return (
    <FormField
      control={form.control}
      name="transformersData.Spectrogram.hop_length"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          {/* yes it is hop size I have seen on internet */}
          <FormLabel>Hop size</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
