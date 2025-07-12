import React from "react";
import { cn } from "~/utils/general";
import type { UseFormReturn } from "react-hook-form";
import type { PipelineDL } from "~/types/pipelineDL";
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
import { getAllowedSubtasks } from "~/helpers/pipelineDL";


type SubTaskFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function SubTaskField({ className, form, ...delegated}: SubTaskFieldProps) {
  const mainTask = form.watch('mainTask')
  const subTasks = getAllowedSubtasks(mainTask)
  
  return (
    <FormField
      control={form.control}
      name="subTask"
      render={({ field }) => (
        <FormItem className={cn('', className)} {...delegated}>
          <FormLabel>Sub Task</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={`Subtask for ${mainTask}`} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {subTasks.map((task, i) => (
                <SelectItem key={i} value={task}>{task}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}