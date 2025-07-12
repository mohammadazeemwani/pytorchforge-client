import React from "react"
import type { ControllerRenderProps } from "react-hook-form"
import { Input } from "~/components/Input"
import { FormControl } from "./Form"

interface InputStringArrayProps extends Omit<React.ComponentProps<typeof Input>, "value" | "onChange"> {
  field: ControllerRenderProps<any, any>
  placeholder?: string
  helperText?: string
  showPreview?: boolean
  allowEmpty?: boolean
  trimWhitespace?: boolean
}

/**
 * A form input component that accepts a comma-separated string of text values
 * and converts them to a string array for form validation and submission.
 *
 * @component
 * @example
 * ```tsx
 * <Controller
 *   name="tags"
 *   control={control}
 *   render={({ field }) => (
 *     <InputStringArray
 *       field={field}
 *       placeholder="Enter tags like: react, typescript, nextjs"
 *       helperText="Separate tags with commas"
 *       allowEmpty={false}
 *       trimWhitespace={true}
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
 * @param props.allowEmpty - Whether to include empty strings in the array
 * @param props.trimWhitespace - Whether to trim whitespace from each string
 * @returns JSX element containing the input and optional preview
 */
export function InputStringArray({
  field,
  placeholder = "Enter text separated by commas",
  helperText,
  showPreview = true,
  allowEmpty = false,
  trimWhitespace = true,
  className,
  ...props
}: InputStringArrayProps) {
  const [inputValue, setInputValue] = React.useState<string>("")
  const [parsedArray, setParsedArray] = React.useState<string[]>([])
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

  // Update form field with debouncing to prevent interference
  const updateFormField = React.useCallback(
    (strings: string[]) => {
      // Clear any pending updates
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current)
      }

      // Defer the field update slightly to prevent input interference
      updateTimeoutRef.current = setTimeout(() => {
        field.onChange(strings)
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

      let parts = value.split(",")

      if (trimWhitespace) {
        parts = parts.map((s) => s.trim())
      }

      if (!allowEmpty) {
        parts = parts.filter((s) => s !== "")
      }

      setParsedArray(parts)
      updateFormField(parts)
    },
    [updateFormField, allowEmpty, trimWhitespace],
  )

  // Validate complete input on blur
  const validateOnBlur = React.useCallback(
    (value: string) => {
      if (!value.trim()) {
        field.onChange([])
        setParsedArray([])
        return
      }

      let parts = value.split(",")

      if (trimWhitespace) {
        parts = parts.map((s) => s.trim())
      }

      if (!allowEmpty) {
        parts = parts.filter((s) => s !== "")
      }

      field.onChange(parts)
      setParsedArray(parts)
    },
    [field, allowEmpty, trimWhitespace],
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
              <span className="font-mono text-blue-600 dark:text-blue-400">
                [{parsedArray.map((str, i) => `"${str}"`).join(", ")}]
              </span>
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
