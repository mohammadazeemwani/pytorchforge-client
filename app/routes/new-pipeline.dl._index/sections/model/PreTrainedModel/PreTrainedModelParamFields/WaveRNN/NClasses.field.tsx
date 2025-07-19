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


type NClassesFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function NClassesField({ className, form, ...delegated }: NClassesFieldProps) {
  return (
    <FormField
      control={form.control}
      name="pretrainedModelsData.WaveRNN.n_classes"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Num of classes</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
