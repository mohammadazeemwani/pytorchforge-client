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


type RolloffFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function RolloffField({
  className,
  form,
  ...delegated
}: RolloffFieldProps) {
  return (
    <FormField
      control={form.control}
      name="transformersData.Resample.rolloff"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Rolloff</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
