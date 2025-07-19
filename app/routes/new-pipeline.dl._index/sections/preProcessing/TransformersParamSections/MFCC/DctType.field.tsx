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


type DctTypeFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function DctTypeField({
  className,
  form,
  ...delegated
}: DctTypeFieldProps) {
  return (
    <FormField
      control={form.control}
      name="transformersData.MFCC.dct_type"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>DCT type</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
