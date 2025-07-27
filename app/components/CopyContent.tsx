import React from "react";
import { Copy, Check, X } from "lucide-react";
import { cn } from "~/utils/general";

type CopyContentProps = {
  content: string;
  className?: string;
  iconClassName?: string;
  successMessage?: string;
  errorMessage?: string;
  showTooltip?: boolean;
  children?: React.ReactNode;
} & React.ComponentProps<'button'>

export function CopyContent({ 
  content,
  className,
  iconClassName,
  successMessage = "Copied!",
  errorMessage = "Failed to copy",
  showTooltip = true,
  children,
  ...delegated 
}: CopyContentProps) {
  const [copied, setCopied] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setError(false);
      
      // Reset after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      setError(true);
      
      // Reset after 2 seconds
      setTimeout(() => setError(false), 2000);
    }
  };

  const getTooltipText = () => {
    if (copied) return successMessage;
    if (error) return errorMessage;
    return "Copy to clipboard";
  };

  const getIconColor = () => {
    if (copied) return "text-success";
    if (error) return "text-error";
    return "text-base-content/80 hover:text-base-content-90";
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "cursor-pointer inline-flex items-center gap-1 p-1 rounded transition-colors",
        "hover:bg-base-100",
        "focus:outline-none focus:ring-2 focus:ring-base-content focus:ring-offset-1",
        className
      )}
      title={showTooltip ? getTooltipText() : undefined}
      {...delegated}
    >
      {children}
      
      {copied ? (
        <Check
          className={cn(
            "w-4 h-4 transition-colors",
            getIconColor(),
            iconClassName
          )}
        />
      ) : error ? (
        <X
          className={cn(
            "w-4 h-4 transition-colors",
            getIconColor(),
            iconClassName
          )}
        />
      ) : (
        <Copy
          className={cn(
            "w-4 h-4 transition-colors",
            getIconColor(),
            iconClassName
          )}
        />
      )}
    </button>
  );
}

// Enhanced version with absolute positioning for overlay on existing content
type CopyOverlayProps = {
  content: string;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  className?: string;
  buttonClassName?: string;
} & Omit<CopyContentProps, 'className' | 'children'>

export function CopyOverlay({ 
  content,
  position = 'top-right',
  className,
  buttonClassName,
  ...copyProps 
}: CopyOverlayProps) {
  const positionClasses = {
    'top-right': 'top-2 right-2',
    'top-left': 'top-2 left-2', 
    'bottom-right': 'bottom-2 right-2',
    'bottom-left': 'bottom-2 left-2'
  };

  return (
    <div className={cn("relative", className)}>
      <div className={cn(
        "absolute z-10",
        positionClasses[position]
      )}>
        <CopyContent
          content={content}
          className={cn(
            "bg-base-300 border border-base-content/20 shadow-sm",
            buttonClassName
          )}
          {...copyProps}
        />
      </div>
    </div>
  );
}