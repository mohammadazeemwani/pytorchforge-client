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


type UpsampleScalesFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function UpsampleScalesField({ className, form, ...delegated }: UpsampleScalesFieldProps) {
  return (
    <FormField
      control={form.control}
      name="pretrainedModelsData.WaveRNN.upsample_scales"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Upsample Scales</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
