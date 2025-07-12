import React from "react"
import type { UseFormReturn } from "react-hook-form"
import type { PipelineDL } from "~/types/pipelineDL"
import { cn } from "~/utils/general"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/Form"
import { InputNumber } from "~/components/InputNumber";


type TimeMaskParamFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function TimeMaskParamField({
  className,
  form,
  ...delegated
}: TimeMaskParamFieldProps) {
  return (
    <FormField
      control={form.control}
      name="transformersData.TimeMasking.time_mask_param"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Time mask</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
