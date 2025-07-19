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

type PaddingIdxFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function PaddingIdxField({
  className,
  form,
  ...delegated
}: PaddingIdxFieldProps) {
  return (
    <FormField
      control={form.control}
      name="customModelsData.Embedding.padding_idx"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Index of Padding</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
