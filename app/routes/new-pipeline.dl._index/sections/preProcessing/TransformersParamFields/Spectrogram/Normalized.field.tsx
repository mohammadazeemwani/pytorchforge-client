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
import { getAllowedNormalized } from "~/helpers/pipelineDL";

type NormalizedFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function NormalizedField({ className, form, ...delegated}: NormalizedFieldProps) {
  const allowedNormalized = getAllowedNormalized()

  // NOTE: do not remove this logic: @mohammadazeem
  // const processNormalized = React.useCallback((value: string) => {
  //   if (value === "true") return true;
  //   if (value === "false") return false;
  //   return value; // "window" or "frame-length" or any other stuff we put in future
  // }, []);

  return (
    <FormField
      control={form.control}
      name="transformersData.Spectrogram.normalized"
      render={({ field }) => (
        <FormItem className={cn('', className)} {...delegated}>
          <FormLabel>Normalized</FormLabel>
          <Select 
            onValueChange={field.onChange} 
            value={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select normalized" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {allowedNormalized.map((normalized, i) => (
                <SelectItem key={i} value={normalized}>
                  {normalized}
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