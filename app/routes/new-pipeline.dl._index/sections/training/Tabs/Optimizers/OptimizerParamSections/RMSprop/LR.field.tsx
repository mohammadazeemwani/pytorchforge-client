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


type LRFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function LRField({ className, form, ...delegated }: LRFieldProps) {
  return (
    <FormField
      control={form.control}
      name="optimizersData.RMSprop.lr"
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
