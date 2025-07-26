import React from "react";
import type { UseFormReturn } from "react-hook-form";
import type { PipelineDL } from "~/types/pipelineDL";
import { cn } from "~/utils/general";
import { MultiSelect } from "~/components/MultiSelect";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/Form"
import { getAllowedMonitoring } from "~/helpers/pipelineDL";

type MonitoringSectionProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function MonitoringSection({ className, form, ...delegated}: MonitoringSectionProps) {
  const monitorsFullList = getAllowedMonitoring()

  return (
    <FormField
      control={form.control}
      name="monitoring"
      render={({ field }) => (
        <FormItem className={cn('', className)}  {...delegated}>
          {/* Wrapping h2 in FormLabel will result in opening the MultiSelect when FormLabel > h2 is clicked */}
          <h2 className="mb-2!">Monitoring</h2>
          <FormControl>
            <MultiSelect 
              options={monitorsFullList.map(t => ({ value: t, label: t}))}
              defaultValue={field.value}
              onValueChange={field.onChange}
              animation={2}
              maxCount={5}
              placeholder="Select monitors"
              />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}