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

type BidirectionalFieldProps = {
  form: UseFormReturn<PipelineDL>,
  index: number
} & React.ComponentProps<"div">

export function BidirectionalField({ className, form, index, ...delegated }: BidirectionalFieldProps) {
  return (
    <FormField
      control={form.control}
      name={`customModels.${index}.props.bidirectional`}
      render={({ field }) => (
        <FormItem
          className={cn("flex gap-2 items-center", className)}
          {...delegated}
        >
          <FormLabel>Bidirectional</FormLabel>
          <FormControl>
            <input
              type="checkbox"
              className="checkbox scale-[0.8]"
              checked={field.value}
              onChange={field.onChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
