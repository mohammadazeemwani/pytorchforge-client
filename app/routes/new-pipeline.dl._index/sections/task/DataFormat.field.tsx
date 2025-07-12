import React from "react";
import { cn } from "~/utils/general";
import type { UseFormReturn } from "react-hook-form";
import type { PipelineDL } from "~/types/pipelineDL";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/Select"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/Form"
import { getAllowedDataFormats } from "~/helpers/pipelineDL";


type DataFormatFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function DataFormatField({ className, form, ...delegated}: DataFormatFieldProps) {
  const mainTask = form.watch('mainTask')
  const dataFormats = getAllowedDataFormats(mainTask)
  
  return (
    <FormField
      control={form.control}
      name="dataFormat"
      render={({ field }) => (
        <FormItem className={cn('', className)} {...delegated}>
          <FormLabel>Data format</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={`Data format for ${mainTask}`} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {dataFormats.map((format, i) => (
                <SelectItem key={i} value={format}>{format}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}