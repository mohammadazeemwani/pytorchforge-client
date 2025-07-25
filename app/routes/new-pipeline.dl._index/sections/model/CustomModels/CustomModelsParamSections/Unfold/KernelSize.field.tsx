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

type KernelSizeFieldProps = {
  form: UseFormReturn<PipelineDL>,
  index: number
} & React.ComponentProps<"div">

export function KernelSizeField({
  className,
  form,
  index,
  ...delegated
}: KernelSizeFieldProps) {
  return (
    <FormField
      control={form.control}
      name={`customModels.${index}.props.kernel_size`}
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Kernel size</FormLabel>
          <FormControl>
            {/* @haroon said this to be a Number field: Not Array of numbers */}
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
