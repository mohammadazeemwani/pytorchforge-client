import React from "react";
import { useFormErrorContext } from "./FormErrorContext";
import { cn } from "~/utils/general";
import type { UseFormSetError } from "react-hook-form";
import type { PipelineDL } from "~/types/pipelineDL";

type FormErrorListProps = {
  setFormError: UseFormSetError<PipelineDL>
} & React.ComponentProps<'ul'>



/**
 * IMP: This component should only be used inside of FormErrorProvider
 * This component is intended to show a container that will contain the unified format for error messages on each step usually.
 */
export function FormErrorList({ className, setFormError, ...delegated}: FormErrorListProps) {
  const { error } = useFormErrorContext()

  React.useEffect(() => {
    if (error?.issues) {
      error.issues.forEach((error) => {
        // console.log(error)
        setFormError(error.path.join('.') as any, { type: 'custom', message: error.message})
      })
    }
  }, [error?.issues])

  if (!error) return null;
  return (
    <ul
      aria-description=""
      className={cn(
        'prose dark:prose-invert',
        'flex flex-col',
        'text-error',
        className
      )}
      {...delegated}
    >
      {error.issues.map((error, i) => {
        return (
          <li key={i}>
            {/* It is recommended to describe custom error messages in zod schema */}
            {/* Cz this will be a list below the form, not below each element */}
            <strong className="italic">{error.path.join(', ')}</strong>{' '}
            {error.message}
          </li>
        )
      })}
    </ul>  
  )
}