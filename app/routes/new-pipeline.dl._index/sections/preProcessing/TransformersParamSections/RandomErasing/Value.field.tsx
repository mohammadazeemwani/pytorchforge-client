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


type ValueFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function ValueField({ className, form, ...delegated }: ValueFieldProps) {
  return (
    <FormField
      control={form.control}
      name="transformersData.RandomErasing.value"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Value</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
