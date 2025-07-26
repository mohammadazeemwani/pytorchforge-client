import React from "react";
import { cn } from "~/utils/general";
import { getAllowedTransformers } from "~/helpers/pipelineDL";
import type { UseFormReturn } from "react-hook-form";
import type { PipelineDL } from "~/types/pipelineDL";
import { MultiSelect } from "~/components/MultiSelect";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/Form"


type TransformersFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function TransformersSelectField({ className, form, ...delegated}: TransformersFieldProps) {
  const mainTask = form.watch('mainTask')
  const transformers = form.watch('transformers')
  /** This will be full list always. cz that is what is needed always for select menu */
  const transformersFullList = getAllowedTransformers(mainTask)

  /** 
   * The list in reach hook form will be updated
   * - MultiSelect will change the count kindof filter
   * - Drag one will change the order (lowest index is visually first [top down approach])
   * IMP: Use form methods like setvalue and all to set values so everything is REACTIVE.
   */

  return (
    <FormField
      control={form.control}
      name="transformers"
      render={({ field }) => (
        <FormItem className={cn('', className)}  {...delegated}>
          <FormLabel>Data format</FormLabel>
          <FormControl>
            <MultiSelect 
              options={transformersFullList.map(t => ({ value: t, label: t}))}
              defaultValue={field.value}
              onValueChange={field.onChange}
              animation={2}
              maxCount={3}
              placeholder="Select transformers"
              />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}