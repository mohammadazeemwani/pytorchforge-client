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


type InputDimFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function InputDimField({ className, form, ...delegated }: InputDimFieldProps) {
  return (
    <FormField
      control={form.control}
      name="pretrainedModelsData.Conformer.input_dim"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Input dimension</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
