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


type FreqMaskParamFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function FreqMaskParamField({
  className,
  form,
  ...delegated
}: FreqMaskParamFieldProps) {
  return (
    <FormField
      control={form.control}
      name="transformersData.FrequencyMasking.freq_mask_param"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Frequency mask</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
