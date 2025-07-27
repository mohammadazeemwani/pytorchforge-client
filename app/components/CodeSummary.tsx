import React from "react";
import { cn } from "~/utils/general";
import { CopyOverlay } from "./CopyContent";

type CodeSummaryProps = {
  /** Label of the accordian */
  label?: string,
  code: string
} & React.ComponentProps<'details'>

export function CodeSummary({ 
  className,
  label="Summary", 
  code,
  ...delegated
}: CodeSummaryProps) {
  return (
    <details
      aria-description=""
      className={cn(
        'prose dark:prose-invert !max-w-none',
        className
      )}
      {...delegated}
    >
      <summary>{label}</summary> 
      <div className="relative">
        <pre 
          className="bg-base-200 text-base-content"
          >
          {code}
        </pre>
        <CopyOverlay 
          content={code} 
          position="top-right"
          className="absolute inset-0 pointer-events-none"
          buttonClassName="pointer-events-auto"
        />
      </div>
    </details>
  )
}