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


type NumFeaturesFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function NumFeaturesField({ className, form, ...delegated }: NumFeaturesFieldProps) {
  return (
    <FormField
      control={form.control}
      name="pretrainedModelsData.Wave2Letter.num_features"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Num of features</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
