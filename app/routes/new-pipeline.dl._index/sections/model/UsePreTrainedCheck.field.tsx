import React from "react";
import type { UseFormReturn } from "react-hook-form";
import type { PipelineDL } from "~/types/pipelineDL";
import { cn } from "~/utils/general";
import { 
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "~/components/Form";

type UsePreTrainedCheckFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function UsePreTrainedCheckField({ form, className, ...delegated}: UsePreTrainedCheckFieldProps) {
  return (
    <FormField
      control={form.control}
      name='usePreTrained'
      render={({ field }) => (
        <FormItem className={cn('flex flex-col', className)} {...delegated}>
          <div className="flex gap-2 items-center px-4 py-2 bg-base-200 border-2 rounded-box border-dashed border-base-300">
            <FormLabel
              className={cn(
                !field.value && 'text-base-content/60' 
              )}
              >
              Use pretrained model
            </FormLabel>
            <FormControl>
              <input 
                type="checkbox" 
                className="toggle scale-[0.8]" 
                checked={field.value} 
                onChange={field.onChange} 
                />
            </FormControl>
            <FormMessage />
          </div>
          <small
            className="text-center italic mt-[-0.3rem]"
          >Toggle to change to {field.value ? 'Custom models' : 'Pretrained model'}</small>
        </FormItem>
      )}
    />
  )
}