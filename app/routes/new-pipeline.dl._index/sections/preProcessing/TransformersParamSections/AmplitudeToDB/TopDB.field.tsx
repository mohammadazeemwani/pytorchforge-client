import React from "react";
import type { UseFormReturn } from "react-hook-form";
import type { PipelineDL } from "~/types/pipelineDL";
import { cn } from "~/utils/general";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/Form"
import { InputNumber } from "~/components/InputNumber";

type TopDBFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function TopDBField({ 
  className, 
  form,
  ...delegated
}: TopDBFieldProps) {

  return (
    <FormField
      control={form.control}
      name="transformersData.AmplitudeToDB.top_db"
      render={({ field }) => {
        return (
        <FormItem className={cn('', className)} {...delegated}>
          <FormLabel>Top DB</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )
      }}
    />
  )
}