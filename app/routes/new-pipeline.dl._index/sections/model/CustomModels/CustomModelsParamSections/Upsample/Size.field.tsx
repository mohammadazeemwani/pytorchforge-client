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

type SizeFieldProps = {
  form: UseFormReturn<PipelineDL>,
  index: number
} & React.ComponentProps<"div">

export function SizeField({
  className,
  form,
  index,
  ...delegated
}: SizeFieldProps) {
  return (
    <FormField
      control={form.control}
      name={`customModels.${index}.props.size`}
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Size</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
