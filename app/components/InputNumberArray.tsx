import React from "react"
import type { ControllerRenderProps } from "react-hook-form"
import { Input } from "~/components/Input"
import { FormControl } from "./Form"

interface InputNumberArrayProps extends Omit<React.ComponentProps<typeof Input>, "value" | "onChange"> {
  field: ControllerRenderProps<any, any>
  placeholder?: string
  helperText?: string
  showPreview?: boolean
}

/**
 * A form input component that accepts a comma-separated string of numbers
 * and converts them to a number array for form validation and submission.
 *
 * Input in here is already wrapped with FormControl
 * @component
 * @example
 * ```tsx
 * <Controller
 *   name="numbers"
 *   control={control}
 *   render={({ field }) => (
 *     <InputNumberArray
 *       field={field}
 *       placeholder="Enter numbers like: 1, 2, 3"
 *       helperText="Separate numbers with commas"
 *     />
 *   )}
 * />
 * ```
 *
 * @param props - The component props
 * @param props.field - React Hook Form controller field props
 * @param props.placeholder - Placeholder text for the input
 * @param props.helperText - Additional help text shown below the input
 * @param props.showPreview - Whether to show the parsed array preview
 * @returns JSX element containing the input and optional preview
 */
export function InputNumberArray({
  field,
  placeholder = "Enter numbers separated by commas",
  helperText,
  showPreview = true,
  className,
  ...props
}: InputNumberArrayProps) {
  const [inputValue, setInputValue] = React.useState<string>("")
  const [parsedArray, setParsedArray] = React.useState<number[]>([])
  const isTypingRef = React.useRef(false)
  const updateTimeoutRef = React.useRef<NodeJS.Timeout>(null)

  // Initialize input value from field value
  React.useEffect(() => {
    if (isTypingRef.current) return // Don't update if user is actively typing

    const currentValue = field.value
    if (Array.isArray(currentValue) && currentValue.length > 0) {
      setInputValue(currentValue.join(", "))
      setParsedArray(currentValue)
    } else {
      setInputValue("")
      setParsedArray([])
    }
  }, [field.value])

  // Parse and update form field with debouncing to prevent interference
  const updateFormField = React.useCallback(
    (numbers: number[]) => {
      // Clear any pending updates
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current)
      }

      // Defer the field update slightly to prevent input interference
      updateTimeoutRef.current = setTimeout(() => {
        field.onChange(numbers)
      }, 0)
    },
    [field],
  )

  // Parse input for preview and form updates
  const parseAndUpdate = React.useCallback(
    (value: string) => {
      if (!value.trim()) {
        setParsedArray([])
        updateFormField([])
        return
      }

      const parts = value
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s !== "")

      const validNumbers: number[] = []
      parts.forEach((part) => {
        const num = Number.parseFloat(part)
        if (!isNaN(num)) {
          validNumbers.push(num)
        }
      })

      setParsedArray(validNumbers)
      updateFormField(validNumbers)
    },
    [updateFormField],
  )

  // Validate complete input on blur for error handling
  const validateOnBlur = React.useCallback(
    (value: string) => {
      try {
        if (!value.trim()) {
          field.onChange([])
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

        field.onChange(numbers)
        setParsedArray(numbers)
      } catch (error) {
        // Pass the raw string to trigger form validation error
        field.onChange(value)
        setParsedArray([])
      }
    },
    [field],
  )

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    isTypingRef.current = true
    setInputValue(value)
    parseAndUpdate(value)
  }

  // Handle blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    isTypingRef.current = false
    validateOnBlur(inputValue)
    field.onBlur()
  }

  // Handle focus
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    isTypingRef.current = true
  }

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="space-y-2">
      <FormControl>
        <Input
          {...props}
          className={className}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          name={field.name}
          ref={field.ref}
        />
      </FormControl>
      {showPreview && (
        <div className="text-sm text-muted-foreground">
          <div>
            <span className="font-medium">Parsed array:</span>{" "}
            {parsedArray.length > 0 ? (
              <span className="font-mono text-green-600 dark:text-green-400">[{parsedArray.join(", ")}]</span>
            ) : (
              <span className="font-mono text-gray-400">[]</span>
            )}
          </div>
          {helperText && <div className="text-xs mt-1 text-muted-foreground">{helperText}</div>}
        </div>
      )}
    </div>
  )
}
