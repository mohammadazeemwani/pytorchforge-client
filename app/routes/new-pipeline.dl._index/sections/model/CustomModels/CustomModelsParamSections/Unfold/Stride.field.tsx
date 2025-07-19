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

type StrideFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function StrideField({
  className,
  form,
  ...delegated
}: StrideFieldProps) {
  return (
    <FormField
      control={form.control}
      name="customModelsData.Unfold.stride"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Stride</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
