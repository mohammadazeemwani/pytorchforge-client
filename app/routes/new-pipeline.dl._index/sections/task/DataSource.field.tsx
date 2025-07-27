import React from "react";
import type { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/Form";
import { FilePicker } from "~/components/Picker/FilePicker";
import { FolderPicker } from "~/components/Picker/FolderPicker";
import type { PipelineDL } from "~/types/pipelineDL";
import { cn } from "~/utils/general";

type DataSourceFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function DataSourceField({ className, form, ...delegated}: DataSourceFieldProps) {
  const sourceValue = form.watch('dataSource.value')

  const [useFileSource, setUseFileSource] = React.useState<boolean>(
    form.getValues('dataSource.type') === 'file' ? true : false
  )
  const useFileInputId = React.useId()

  React.useEffect(() => {
    if (useFileSource) form.setValue('dataSource.type', 'file')
    else form.setValue('dataSource.type', 'folder');
  }, [useFileSource, form])

  const onSourceValueUpdate = React.useCallback((val: string | null) => {
    if (val) {
      form.setValue('dataSource.value', val)
    } else {
      form.resetField('dataSource.value')
    }
  }, [form])

  return (
    <FormField
      control={form.control} 
      name="dataSource.value"
      render={({ field, fieldState }) => {

        return (
          <FormItem
            className={cn(
              className
            )}
            {...delegated}
          >
            <FormLabel>Data source</FormLabel>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex gap-2 items-center px-4 py-1.5 w-fit bg-base-200 border-2 rounded-box border-dashed border-base-300">
                <label 
                  htmlFor={useFileInputId}
                  className={cn(
                    useFileSource && 'text-base-content/50'
                  )}
                  >
                  Select folder
                </label>
                <input 
                  type="checkbox" 
                  id={useFileInputId}
                  className="toggle scale-[0.8]" 
                  checked={useFileSource} 
                  onChange={(e) => {
                    setUseFileSource(e.target.checked)
                  }} 
                  />  
                <label 
                  htmlFor={useFileInputId}
                  className={cn(
                    !useFileSource && 'text-base-content/50'
                  )}
                  >
                  Select file
                </label>
              </div>
              <div>
                {useFileSource
                ? (
                  <FilePicker onUpdate={onSourceValueUpdate}/>
                )
                : (
                  <FolderPicker onUpdate={onSourceValueUpdate} />
                )}
              </div>
            </div>
            <div className="flex gap-2 items-start mt-3">
              <span className="font-medium ">Path:</span>
              <span className="italic text-sm mt-[0.26rem]">
                {sourceValue ? sourceValue : 'choose source first..'}
              </span>
            </div>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}