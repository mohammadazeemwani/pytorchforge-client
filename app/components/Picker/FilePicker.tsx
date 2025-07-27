import React from "react";
import { cn } from "~/utils/general";
import { open } from '@tauri-apps/plugin-dialog'


type FilePickerProps = {
  btnClassName?: string,
  label?: string,
  loadingLabel?: string,
  onUpdate?: (newVal: string | null) => void
} & React.ComponentProps<'div'>

/**
 * For working philosophy, go to ~/components/Picker/README.md
 */
export function FilePicker({ 
  className, 
  btnClassName,
  /** Label that the button will bear */
  label="Choose file", 
  loadingLabel="Loading..",
  onUpdate,
  ...delegated
}: FilePickerProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleClick = React.useCallback(async () => {
    setIsLoading(true);
    const data = await open({
        multiple: false,
        directory: false,
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
        aria-description="button to pick file path"
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