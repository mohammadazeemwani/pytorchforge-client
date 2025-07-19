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


type DimFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function DimField({ className, form, ...delegated }: DimFieldProps) {
  return (
    <FormField
      control={form.control}
      name="pretrainedModelsData.GloVe.dim"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Dimentions</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
