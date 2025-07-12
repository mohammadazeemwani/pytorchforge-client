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


type ContrastFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function ContrastField({
  className,
  form,
  ...delegated
}: ContrastFieldProps) {
  return (
    <FormField
      control={form.control}
      name="transformersData.ColorJitter.contrast"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Contrast</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
