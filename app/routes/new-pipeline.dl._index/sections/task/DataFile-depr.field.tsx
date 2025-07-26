// This should be a file picker with editable input field
import React from "react";
import { cn } from "~/utils/general";
import type { UseFormReturn } from "react-hook-form";
import type { PipelineDL } from "~/types/pipelineDL";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/Form"


type DataFileFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function DataFileField({ className, form, ...delegated}: DataFileFieldProps) {

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  // Get the current file from form state
  const currentFile = form.watch('dataFile');
  
  // Recreate FileList when component mounts if there's a stored file
  React.useEffect(() => {
    if (currentFile && fileInputRef.current) {
      // Create a new FileList with the stored file
      const dt = new DataTransfer();
      dt.items.add(currentFile);
      fileInputRef.current.files = dt.files;
    }
  }, [currentFile]);

  return (
    <FormField
      control={form.control}
      name="dataFile"
      render={({ field }) => (
        <FormItem className={cn('', className)} {...delegated}>
          <div className="flex items-center gap-2">
            <FormLabel>Data File</FormLabel>
            {currentFile && (
              <span className="text-sm muted-text font-mono">
                {(currentFile.size / (1024*1024)).toPrecision(2)} MB
              </span>
            )}
          </div>
            <div className="space-y-2">
              <FormControl>
              <input
                ref={fileInputRef}
                type="file" 
                className="file-input w-full" 
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    // Store the actual File object in form state
                    form.setValue('dataFile', file);
                  }
                }}
              />
              </FormControl>
            </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}