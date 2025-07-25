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

type NumEncoderLayersFieldProps = {
  form: UseFormReturn<PipelineDL>,
  index: number
} & React.ComponentProps<"div">

export function NumEncoderLayersField({
  className,
  form,
  index,
  ...delegated
}: NumEncoderLayersFieldProps) {
  return (
    <FormField
      control={form.control}
      name={`customModels.${index}.props.num_encoder_layers`}
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Num of encoder layers</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
