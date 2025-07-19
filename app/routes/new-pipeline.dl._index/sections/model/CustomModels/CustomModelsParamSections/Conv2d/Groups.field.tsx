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

type GroupsFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function GroupsField({
  className,
  form,
  ...delegated
}: GroupsFieldProps) {
  return (
    <FormField
      control={form.control}
      name="customModelsData.Conv2d.groups"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Groups</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
