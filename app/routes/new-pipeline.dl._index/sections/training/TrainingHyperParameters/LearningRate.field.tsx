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


type LearningRateFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function LearningRateField({ className, form, ...delegated }: LearningRateFieldProps) {
  return (
    <FormField
      control={form.control}
      name="trainingHyperParameters.learning_rate"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Learning rate</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
