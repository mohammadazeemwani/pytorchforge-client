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
import { getAllowedPipelineDLModeSchema } from "~/helpers/pipelineDL";

type ModeFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function ModeField({ className, form, ...delegated}: ModeFieldProps) {
  const allowedModes = getAllowedPipelineDLModeSchema()
  
  return (
    <FormField
      control={form.control}
      name="earlyStopping.mode"
      render={({ field }) => (
        <FormItem className={cn('', className)} {...delegated}>
          <FormLabel>Mode</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {allowedModes.map((mode, i) => (
                <SelectItem key={i} value={mode}>
                  {mode}
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