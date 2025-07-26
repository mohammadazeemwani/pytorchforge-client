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


type AlphaFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function AlphaField({ className, form, ...delegated }: AlphaFieldProps) {
  return (
    <FormField
      control={form.control}
      name="optimizersData.RMSprop.alpha"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Alpha</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
