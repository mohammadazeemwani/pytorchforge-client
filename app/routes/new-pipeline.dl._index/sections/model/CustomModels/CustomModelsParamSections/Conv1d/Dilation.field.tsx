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


type DilationFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function DilationField({ className, form, ...delegated }: DilationFieldProps) {
  return (
    <FormField
      control={form.control}
      name="customModelsData.Conv1d.dilation"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Dilation</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
