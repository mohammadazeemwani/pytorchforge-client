import React from "react";
import type { UseFormReturn } from "react-hook-form";
import type { PipelineDL } from "~/types/pipelineDL";
import { cn } from "~/utils/general";
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
import { getAllowedTensorD } from "~/helpers/pipelineDL";

type DtypeFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function DtypeField({ className, form, ...delegated}: DtypeFieldProps) {
  const allowedTensorD = getAllowedTensorD()
  
  return (
    <FormField
      control={form.control}
      name="transformersData.Resample.dtype"
      render={({ field }) => (
        <FormItem className={cn('', className)} {...delegated}>
          <FormLabel>TensorD</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select tensorD" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {allowedTensorD.map((tensorD, i) => (
                <SelectItem key={i} value={tensorD}>
                  {tensorD}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />    
  )
}