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
import { InputNumber } from "~/components/InputNumber"

type OutputPaddingFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function OutputPaddingField({
  className,
  form,
  ...delegated
}: OutputPaddingFieldProps) {
  return (
    <FormField
      control={form.control}
      name="customModelsData.ConvTranspose1d.output_padding"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Output padding</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
