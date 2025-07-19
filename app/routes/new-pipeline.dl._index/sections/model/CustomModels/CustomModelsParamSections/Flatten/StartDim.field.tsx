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
import { InputNumber } from "~/components/InputNumber"

type StartDimFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function StartDimField({
  className,
  form,
  ...delegated
}: StartDimFieldProps) {
  return (
    <FormField
      control={form.control}
      name="customModelsData.Flatten.start_dim"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Start dimension</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
