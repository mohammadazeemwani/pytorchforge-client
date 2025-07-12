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


type BrightnessFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function BrightnessField({
  className,
  form,
  ...delegated
}: BrightnessFieldProps) {
  return (
    <FormField
      control={form.control}
      name="transformersData.ColorJitter.brightness"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Brightness</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
