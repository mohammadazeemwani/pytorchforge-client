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


type LayerNormEpsFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function LayerNormEpsField({ className, form, ...delegated }: LayerNormEpsFieldProps) {
  return (
    <FormField
      control={form.control}
      name="pretrainedModelsData.Transformer.layer_norm_eps"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Layer Norm Epsilon</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
