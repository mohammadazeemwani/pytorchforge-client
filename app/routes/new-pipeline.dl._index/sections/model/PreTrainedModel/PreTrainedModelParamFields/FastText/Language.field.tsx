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
import { Input } from "~/components/Input";

type LanguageFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function LanguageField({ 
  className, 
  form,
  ...delegated
}: LanguageFieldProps) {

  return (
    <FormField
      control={form.control}
      name="pretrainedModelsData.FastText.language"
      render={({ field }) => (
        <FormItem className={cn('', className)} {...delegated}>
          <FormLabel>Language</FormLabel>
          <FormControl>
            <Input {...field}/>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}