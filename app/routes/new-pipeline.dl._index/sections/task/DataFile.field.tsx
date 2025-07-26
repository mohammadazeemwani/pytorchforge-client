// This is a Tauri-enabled file picker with editable input field
import React from "react";
import { open } from '@tauri-apps/plugin-dialog';
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
  acceptedExtensions?: string[] // e.g., ['csv', 'json', 'txt']
  allowMultiple?: boolean
} & React.ComponentProps<'div'>

export function DataFileField({ 
  className, 
  form, 
  acceptedExtensions = ['*'], 
  allowMultiple = false,
  ...delegated 
}: DataFileFieldProps) {

  const [isLoading, setIsLoading] = React.useState(false);
  
  // Get the current file path from form state
  const currentFilePath = form.watch('dataFile');
  
  // Extract filename from absolute path for display
  const getFileName = (path: string) => {
    if (!path) return '';
    return path.split(/[\\/]/).pop() || '';
  };

  // Get file size (you might want to implement this via Tauri's fs API)
  const getFileSize = async (path: string): Promise<number | null> => {
    try {
      // You can implement this using Tauri's fs API
      // For now, returning null - you can add this later
      return null;
    } catch (error) {
      console.error('Error getting file size:', error);
      return null;
    }
  };

  const handleFileSelect = async () => {
    setIsLoading(true);
    try {
      const selected = await open({
        multiple: allowMultiple,
        filters: [{
          name: 'Data Files',
          extensions: acceptedExtensions
        }]
      });
      
      if (selected) {
        // selected will be a string (single file) or string[] (multiple files)
        const filePath = Array.isArray(selected) ? selected[0] : selected;
        
        // Store the absolute path in form state
        form.setValue('dataFile', filePath);
        
        // Clear any existing errors
        form.clearErrors('dataFile');
      }
    } catch (error) {
      console.error('Error selecting file:', error);
      form.setError('dataFile', {
        type: 'manual',
        message: 'Failed to select file'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePathEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPath = e.target.value;
    form.setValue('dataFile', newPath);
  };

  const clearSelection = () => {
    form.setValue('dataFile', '');
  };

  return (
    <FormField
      control={form.control}
      name="dataFile"
      render={({ field }) => (
        <FormItem className={cn('', className)} {...delegated}>
          <div className="flex items-center gap-2">
            <FormLabel>Data File</FormLabel>
            {currentFilePath && (
              <span className="text-sm muted-text font-mono">
                {getFileName(currentFilePath)}
              </span>
            )}
          </div>
          
          <div className="space-y-2">
            {/* File path input - editable */}
            <FormControl>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter file path or click Browse..."
                  value={currentFilePath || ''}
                  onChange={handlePathEdit}
                />
                <button
                  type="button"
                  onClick={handleFileSelect}
                  disabled={isLoading}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {isLoading ? 'Loading...' : 'Browse'}
                </button>
                {currentFilePath && (
                  <button
                    type="button"
                    onClick={clearSelection}
                    className="px-3 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 whitespace-nowrap"
                  >
                    Clear
                  </button>
                )}
              </div>
            </FormControl>
            
            {/* File info display */}
            {currentFilePath && (
              <div className="text-sm text-muted-foreground space-y-1">
                <div className="font-mono bg-muted p-2 rounded text-xs break-all">
                  {currentFilePath}
                </div>
                <div className="flex gap-4 text-xs">
                  <span>File: {getFileName(currentFilePath)}</span>
                  {/* You can add file size here once implemented */}
                </div>
              </div>
            )}
          </div>
          
          <FormMessage />
        </FormItem>
      )}
    />
  )
}