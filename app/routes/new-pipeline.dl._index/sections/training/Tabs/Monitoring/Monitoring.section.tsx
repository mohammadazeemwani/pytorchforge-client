import React from "react";
import type { UseFormReturn } from "react-hook-form";
import type { PipelineDL } from "~/types/pipelineDL";
import { cn } from "~/utils/general";
import { MultiSelect } from "~/components/MultiSelect";
import {
  FormControl,
  FormDescription,
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
          {/* Wrapping h3 in FormLabel will result in opening the MultiSelect when FormLabel > h2 is clicked */}
          <h3 className="mb-2!">Monitoring</h3>
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
          <FormDescription>
            Select the monitors you want by clicking the above select menu <br />
            You can select multiple monitors 😉.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}