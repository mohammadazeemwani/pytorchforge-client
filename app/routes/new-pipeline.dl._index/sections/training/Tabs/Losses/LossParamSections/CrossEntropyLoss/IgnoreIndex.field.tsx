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


type IgnoreIndexFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function IgnoreIndexField({ className, form, ...delegated }: IgnoreIndexFieldProps) {
  return (
    <FormField
      control={form.control}
      name="lossesData.CrossEntropyLoss.ignore_index"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Index to ignore</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
