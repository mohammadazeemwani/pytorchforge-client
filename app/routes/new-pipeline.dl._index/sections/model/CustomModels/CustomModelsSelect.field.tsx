import React from "react";
import { cn } from "~/utils/general";
import { getAllowedCustomModels } from "~/helpers/pipelineDL";
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


type CustomModelsSelectFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function CustomModelsSelectField({ className, form, ...delegated}: CustomModelsSelectFieldProps) {
  const customModelsFullList = getAllowedCustomModels()
  const selectedModels = form.watch('customModels');

  React.useEffect(() => {
    // this effect is imp when some field is added and has no default object for it, 
    // we will miss if there is any error cz the field is optional and user hasn't clicked the gear icon
    // SO we must render an empty object for the selected models on customModelsData 
    if (selectedModels?.length > 0) {
      const populatedModels = form.getValues('customModelsData');

      // only update for untouched cz we don't want to reset all props every time new entry is added
      const untouchedModels = selectedModels.filter(model => !Object.keys(populatedModels).includes(model))
      // console.log({ untouchedModels })
      for (const model of untouchedModels) { 
        form.setValue(`customModelsData.${model}` as any, {})
      }
    }
  }, [selectedModels])

  return (
    <FormField
      control={form.control}
      name="customModels"
      render={({ field }) => (
        <FormItem className={cn('', className)}  {...delegated}>
          <FormLabel>Custom models</FormLabel>
          <FormControl>
            <MultiSelect 
              options={customModelsFullList.map(t => ({ value: t, label: t}))}
              defaultValue={field.value}
              onValueChange={field.onChange}
              placeholder="Select layers"
              animation={2}
              maxCount={3}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}