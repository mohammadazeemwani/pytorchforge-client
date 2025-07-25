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

type DModelFieldProps = {
  form: UseFormReturn<PipelineDL>,
  index: number
} & React.ComponentProps<"div">

export function DModelField({
  className,
  form,
  index,
  ...delegated
}: DModelFieldProps) {
  return (
    <FormField
      control={form.control}
      name={`customModels.${index}.props.d_model`}
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Dimension of model</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
