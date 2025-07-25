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

type BiasFieldProps = {
  form: UseFormReturn<PipelineDL>,
  index: number
} & React.ComponentProps<"div">

export function BiasField({ className, index, form, ...delegated }: BiasFieldProps) {
  return (
    <FormField
      control={form.control}
      name={`customModels.${index}.props.bias`}
      render={({ field }) => (
        <FormItem
          className={cn("flex gap-2 items-center", className)}
          {...delegated}
        >
          <FormLabel>Include bias</FormLabel>
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
