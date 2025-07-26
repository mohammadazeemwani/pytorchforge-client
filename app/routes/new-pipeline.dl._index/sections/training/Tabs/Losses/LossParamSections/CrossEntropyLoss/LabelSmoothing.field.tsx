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


type LabelSmoothingFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function LabelSmoothingField({ className, form, ...delegated }: LabelSmoothingFieldProps) {
  return (
    <FormField
      control={form.control}
      name="lossesData.CrossEntropyLoss.label_smoothing"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Label smoothing</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
