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

type EndDimFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function EndDimField({
  className,
  form,
  ...delegated
}: EndDimFieldProps) {
  return (
    <FormField
      control={form.control}
      name="customModelsData.Flatten.end_dim"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>End dimension</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
