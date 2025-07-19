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


type DimFeedforwardFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function DimFeedforwardField({ className, form, ...delegated }: DimFeedforwardFieldProps) {
  return (
    <FormField
      control={form.control}
      name="pretrainedModelsData.Transformer.dim_feedforward"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Feedforward Layer Size</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
