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


type NumDecoderLayersFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function NumDecoderLayersField({ className, form, ...delegated }: NumDecoderLayersFieldProps) {
  return (
    <FormField
      control={form.control}
      name="pretrainedModelsData.Transformer.num_decoder_layers"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Num of decoder layers</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
