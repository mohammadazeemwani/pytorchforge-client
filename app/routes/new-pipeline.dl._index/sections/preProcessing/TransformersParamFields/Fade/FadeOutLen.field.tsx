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


type FadeOutLenFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function FadeOutLenField({
  className,
  form,
  ...delegated
}: FadeOutLenFieldProps) {
  return (
    <FormField
      control={form.control}
      name="transformersData.Fade.fade_out_len"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Fade out length</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
