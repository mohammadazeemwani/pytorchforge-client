import React from "react";
import { CodeSummary } from "~/components/CodeSummary";
import { cn } from "~/utils/general";

type PyCodeResultProps = {
  code: string
} & React.ComponentProps<'div'>

export function PyCodeResult({ className, code, ...delegated}: PyCodeResultProps) {
  return (
    <div
      aria-description=""
      className={cn(
        'prose dark:prose-invert !max-w-none',
        className
      )}
      {...delegated}
    >
      <h1>Result</h1>
      <CodeSummary 
        className="mt-5"
        code={code}
        downloadFileName="pipeline.py"
      />
    </div>
  )
}