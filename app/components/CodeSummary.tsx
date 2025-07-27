import React from "react";
import { cn } from "~/utils/general";
import { CopyContent, CopyOverlay } from "./CopyContent";
import { DownloadContent, DownloadOverlay } from "./DownloadContent";

type CodeSummaryProps = {
  /** Label of the accordian */
  label?: string,
  showCopyButton?: boolean,

  /** when passed, download button will be shown */
  downloadFileName?: string
  code: string
} &  React.ComponentProps<'details'>

export function CodeSummary({ 
  className,
  label, 
  showCopyButton=true,
  downloadFileName,
  code,
  ...delegated
}: CodeSummaryProps) {

  if (label)
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
        <div className="absolute top-2 right-2 flex gap-1">
          {showCopyButton && (
            <CopyContent content={code} />
          )}
          {downloadFileName && (
            <DownloadContent 
              content={code}
              filename={downloadFileName}
            />
          )}
        </div>
      </div>
    </details>
  )

  if (!label) 
    
  return (
    <div 
      className={cn(
        'relative',
        className
      )}
    >
      <pre 
        className="bg-base-200 text-base-content"
        >
        {code}
      </pre>
        <div className="absolute top-2 right-2 flex gap-1">
          {showCopyButton && (
            <CopyContent content={code} />
          )}
          {downloadFileName && (
            <DownloadContent 
              content={code}
              filename={downloadFileName}
            />
          )}
        </div>
    </div>
  )
}