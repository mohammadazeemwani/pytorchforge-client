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


type EPSFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function EPSField({ className, form, ...delegated }: EPSFieldProps) {
  return (
    <FormField
      control={form.control}
      name="optimizersData.Adam.eps"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Epsilon</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
