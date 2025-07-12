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
import { getAllowedGainType } from "~/helpers/pipelineDL";

type GainTypeFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function GainTypeField({ className, form, ...delegated}: GainTypeFieldProps) {
  const allowedGainType = getAllowedGainType()
  
  return (
    <FormField
      control={form.control}
      name="transformersData.Vol.gain_type"
      render={({ field }) => (
        <FormItem className={cn('', className)} {...delegated}>
          <FormLabel>Gain type</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select gain" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {allowedGainType.map((gain, i) => (
                <SelectItem key={i} value={gain}>
                  {gain}
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