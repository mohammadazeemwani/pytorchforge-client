import React from "react";
import type { UseFormReturn } from "react-hook-form";
import type { PipelineDL } from "~/types/pipelineDL";
import { cn } from "~/utils/general";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/Form"
import { Input } from "~/components/Input";

type SigmaFieldProps = {
  form: UseFormReturn<PipelineDL>
  inputValue: string,
  setInputValue: React.Dispatch<React.SetStateAction<string>>,
  parsedArray: number[],
  setParsedArray: React.Dispatch<React.SetStateAction<number[]>>,
} & React.ComponentProps<'div'>

export function SigmaField({ 
  className, 
  form,
  inputValue,
  setInputValue,
  parsedArray,
  setParsedArray, 
  ...delegated
}: SigmaFieldProps) {

  // Initialize input value from form data
  React.useEffect(() => {
    const currentValue = form.getValues("transformersData.GaussianBlur.sigma")
    if (Array.isArray(currentValue)) {
      setInputValue(currentValue.join(", "))
      setParsedArray(currentValue)
    }
  }, [])

  // Parsing comma-separated input and validate
  const parseAndValidate = React.useCallback((value: string) => {
    try {
      if (!value.trim()) {
        form.setError("transformersData.GaussianBlur.sigma", {
          type: "required",
          message: "Sigma is required"
        })
        setParsedArray([])
        return
      }

      const numbers = value
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s !== "")
        .map((s) => {
          const num = Number.parseFloat(s)
          if (isNaN(num)) {
            throw new Error(`"${s}" is not a valid number`)
          }
          return num
        })

      if (numbers.length === 0) {
        form.setError("transformersData.GaussianBlur.sigma", {
          type: "validation",
          message: "At least one number is required"
        })
        setParsedArray([])
        return
      }

      // Clearing any existing errors
      form.clearErrors("transformersData.GaussianBlur.sigma")
      
      // Updat form with parsed array > IMP.
      form.setValue("transformersData.GaussianBlur.sigma", numbers, { 
        shouldValidate: true,
        shouldDirty: true 
      })
      
      setParsedArray(numbers)
    } catch (error) {
      form.setError("transformersData.GaussianBlur.sigma", {
        type: "validation",
        message: error instanceof Error ? error.message : "Invalid input"
      })
      setParsedArray([])
    }
  }, [form])

  // Handling input change
  const handleInputChange = (value: string) => {
    setInputValue(value)
    parseAndValidate(value)
  }
  
  return (
    <FormField
      control={form.control}
      name="transformersData.GaussianBlur.sigma"
      render={({ field }) => (
        <FormItem className={cn('', className)} {...delegated}>
          <FormLabel>Sigma</FormLabel>
          <div className="space-y-2">
            <FormControl>
            <Input
              {...field}
              placeholder="800, 600, 3"
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
            />
            </FormControl>
            {/* Real-time parsing preview */}
            <div className="text-sm text-muted-foreground">
              <div>
                <span className="font-medium">Parsed array:</span>{" "}
                {parsedArray.length > 0 ? (
                  <span className="font-mono text-green-600 dark:text-green-400">
                    [{parsedArray.join(", ")}]
                  </span>
                ) : (
                  <span className="font-mono text-gray-400">[]</span>
                )}
              </div>
              <div className="text-xs mt-1">
                Enter numbers separated by commas (e.g., 800, 600, 3)
              </div>
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}