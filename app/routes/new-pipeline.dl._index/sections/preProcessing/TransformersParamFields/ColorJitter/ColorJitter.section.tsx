import React from "react"
import { cn } from "~/utils/general"
import type { TransformerFieldProps } from "../../transformers-param-section.mapper"
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/Dialog"
import { Cog, RotateCwIcon } from "~/components/AnimatedIcons"
import { BrightnessField } from "./Brightness.field"
import { ContrastField } from "./Contrast.field"
import { SaturationField } from "./Saturation.field"
import { HueField } from "./Hue.field"

/**
 * delegated props are not applied
 */
export function ColorJitterSection({
  className,
  form,
  ...delegated
}: TransformerFieldProps) {
  const [open, setOpen] = React.useState(false)
  const [resetKey, setResetKey] = React.useState(0)

  const { error } = form.getFieldState("transformersData.ColorJitter", form.formState)

  const resetSection = React.useCallback(() => {
    form.resetField("transformersData.ColorJitter")
    setResetKey(k => k+1)
  }, [form])

  return (
    <Dialog
      open={error ? true : open}
      onOpenChange={(value) => {
        if (!error) setOpen(value)
      }}
    >
      <DialogTrigger className={cn("cursor-pointer ml-auto", className)}>
        <Cog className="text-base-content w-[1.4rem]" />
      </DialogTrigger>
      <DialogContent
        className={cn("prose dark:prose-invert", "")}
        showCloseButton={!error}
      >
        <DialogHeader>
          <DialogTitle className="mt-0">Params of ColorJitter</DialogTitle>
          <DialogDescription className="sr-only">
            change params of transformer
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6" key={resetKey}>
          <BrightnessField form={form} />
          <ContrastField form={form} />
          <SaturationField form={form} />
          <HueField form={form} />
        </div>

        <DialogFooter className="mt-4 flex flex-col sm:flex-col">
          <div className="flex items-center gap-1.5">
            <DialogClose className="w-full btn flex-3/4" disabled={!!error}>
              Close
            </DialogClose>
            <button
              title="reset the values in this section"
              onClick={resetSection}
              className="btn btn-success"
            >
              <RotateCwIcon className="w-[1.3rem]" />
            </button>
          </div>

          {error && (
            <span className="italic text-sm text-red-600 dark:text-red-400">
              Fix the errors above or reset to continue
            </span>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
