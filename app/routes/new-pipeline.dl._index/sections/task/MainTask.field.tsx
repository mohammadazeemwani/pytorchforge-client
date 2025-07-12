import React from "react";
import { cn } from "~/utils/general";
import type { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import type { MainTask, PipelineDL } from "~/types/pipelineDL";
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


const mainTasks = ['image', 'text', 'audio'] as const satisfies ReadonlyArray<MainTask>
export const schema = z.object({
  mainTask: z.enum(mainTasks, {
    message: `accepted values are: ${mainTasks}`
  }).default('image')
})

type MainTaskFieldProps = {
  form: UseFormReturn<PipelineDL>,
  className?: string
}
export function MainTaskField({ form, className, ...delegated}: MainTaskFieldProps) {

  return (
    <FormField
      control={form.control}
      name="mainTask"
      render={({ field }) => (
        <FormItem className={cn('', className)} {...delegated}>
          <FormLabel>Main Task</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select main task" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {mainTasks.map((task, i) => (
                <SelectItem key={i} value={task}>{task}</SelectItem>
              ))}
              {/* <SelectItem value="fjlksd">testing</SelectItem> */}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}




// type MainTaskFieldProps1 = {} & React.ComponentProps<'div'>
// export function MainTaskField1({ className, ...delegated}: MainTaskFieldProps1) {
//   const { control, watch } = useForm({
//     resolver: zodResolver(schema),
//     defaultValues: schema.parse({}),
//     mode: "onChange"
//   })
  
//   const { field, fieldState } = useController({
//     name: 'mainTask',
//     control
//   })
//   const { error } = fieldState;
//   const categoryValue = watch('mainTask');
  
//   return (
//     <div
//       aria-description=""
//       className={cn(
//         'prose dark:prose-invert',
//         className
//       )}
//       {...delegated}
//     >
//     <select 
//       {...field} 
//       className={cn(
//         "select",
//         error && 'select-error'
//       )}
//     >
//       <option value='image'>Image</option>
//       <option value='text'>Text</option>
//       <option value='audio'>Audio</option>
//     </select>
//     {error && (
//       <p className="text-error">{error.message}</p>
//     )}
//     {/* <p>Selected: {categoryValue}</p> */}
//     </div>
//   )
// }