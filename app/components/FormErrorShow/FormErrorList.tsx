import React from "react";
import { useFormErrorContext } from "./FormErrorContext";
import { cn } from "~/utils/general";

type FormErrorListProps = {} & React.ComponentProps<'ul'>

/**
 * IMP: This component should only be used inside of FormErrorProvider
 * This component is intended to show a container that will contain the unified format for error messages on each step usually.
 */
export function FormErrorList({ className, ...delegated}: FormErrorListProps) {
  const { error } = useFormErrorContext()

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
      {error.issues.map((error, i) => (
        <li key={i}>
          {/* It is recommended to describe custom error messages in zod schema */}
          {/* Cz this will be a list below the form, not below each element */}
          {error.message}
        </li>
      ))}
    </ul>  
  )
}