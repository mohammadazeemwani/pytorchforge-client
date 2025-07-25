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
import { InputNumber } from "~/components/InputNumber";


type PaddingFieldProps = {
  form: UseFormReturn<PipelineDL>,
  index: number
} & React.ComponentProps<"div">

export function PaddingField({ className, form, index, ...delegated }: PaddingFieldProps) {
  return (
    <FormField
      control={form.control}
      name={`customModels.${index}.props.padding`}
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Padding</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
