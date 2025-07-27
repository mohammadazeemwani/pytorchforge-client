import React from "react";
import { cn } from "~/utils/general";
import { open } from '@tauri-apps/plugin-dialog'


type FolderPickerProps = {
  btnClassName?: string,
  label?: string,
  loadingLabel?: string,
  onUpdate?: (newVal: string | null) => void
} & React.ComponentProps<'div'>

/**
 * For working philosophy, go to ~/components/Picker/README.md
 */
export function FolderPicker({ 
  btnClassName,
  className, 
  /** Label that the button will bear */
  label="Choose folder", 
  loadingLabel="Loading..",
  onUpdate,
  ...delegated
}: FolderPickerProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleClick = React.useCallback(async () => {
    setIsLoading(true);
    const data = await open({
        multiple: false,
        directory: true,
    })
    // console.log(data)
    onUpdate && onUpdate(data)
    setIsLoading(false)
  }, [setIsLoading])

  return (
    <div
      className={cn(
        'prose dark:prose-invert !max-w-none',
        className
      )}
      {...delegated}
    >
      <button
        aria-description="button to pick folder path"
        type="button"
        className={cn(
          "btn btn-primary",
          btnClassName
        )}
        onClick={handleClick}
      >
        {isLoading
        ? loadingLabel
        : label}
      </button>
    </div>
  )
}