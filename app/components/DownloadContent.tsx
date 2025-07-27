import React from "react";
import { Download, Check, X } from "lucide-react";
import { save } from '@tauri-apps/plugin-dialog';
import { writeTextFile } from '@tauri-apps/plugin-fs';
import { cn } from "~/utils/general";

type DownloadContentProps = {
  content: string;
  filename: string;
  mimeType?: string;
  className?: string;
  iconClassName?: string;
  successMessage?: string;
  errorMessage?: string;
  showTooltip?: boolean;
  children?: React.ReactNode;
} & React.ComponentProps<'button'>

export function DownloadContent({ 
  content,
  filename,
  mimeType = "text/plain",
  className,
  iconClassName,
  successMessage = "Downloaded!",
  errorMessage = "Failed to download",
  showTooltip = true,
  children,
  ...delegated 
}: DownloadContentProps) {
  const [downloaded, setDownloaded] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      // Use Tauri v2 plugin save dialog
      const filePath = await save({
        defaultPath: filename,
        filters: [{
          name: 'File',
          extensions: [filename.split('.').pop() || 'txt']
        }]
      });
      
      if (filePath) {
        // Write content using Tauri v2 fs plugin
        await writeTextFile(filePath, content);
        
        setDownloaded(true);
        setError(false);
        
        // Reset after 2 seconds
        setTimeout(() => setDownloaded(false), 2000);
      }
    } catch (err) {
      console.error('Failed to save file:', err);
      setError(true);
      
      // Reset after 2 seconds
      setTimeout(() => setError(false), 2000);
    }
  };

  const getTooltipText = () => {
    if (downloaded) return successMessage;
    if (error) return errorMessage;
    return `Save ${filename}`;
  };

  const getIconColor = () => {
    if (downloaded) return "text-success";
    if (error) return "text-error";
    return "text-base-content/80 hover:text-base-content-90";
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
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
      
      {downloaded ? (
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
        <Download
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
type DownloadOverlayProps = {
  content: string;
  filename: string;
  mimeType?: string;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  className?: string;
  buttonClassName?: string;
} & Omit<DownloadContentProps, 'className' | 'children' | 'content' | 'filename' | 'mimeType'>

export function DownloadOverlay({ 
  content,
  filename,
  mimeType = "text/plain",
  position = 'top-right',
  className,
  buttonClassName,
  ...downloadProps 
}: DownloadOverlayProps) {
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
        <DownloadContent
          content={content}
          filename={filename}
          mimeType={mimeType}
          className={cn(
            "bg-base-300 border border-base-content/20 shadow-sm",
            buttonClassName
          )}
          {...downloadProps}
        />
      </div>
    </div>
  );
}