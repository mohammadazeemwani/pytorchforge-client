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
import { OrigFreqField } from "./OrigFreq.field"
import { NewFreqField } from "./NewFreq.field"
import { ResamplingMethodField } from "./ResamplingMethod.field"
import { LowpassFilterWidthField } from "./LowpassFilterWidth.field"
import { RolloffField } from "./Rolloff.field"
import { BetaField } from "./Beta.field"
import { DtypeField } from "./Dtype.field"

/**
 * delegated props are not applied
 */
export function ResampleSection({
  className,
  form,
  ...delegated
}: TransformerFieldProps) {
  const [open, setOpen] = React.useState(false)
  const [resetKey, setResetKey] = React.useState(0)

  const { error } = form.getFieldState(
    "transformersData.Resample",
    form.formState,
  )

  const resetSection = React.useCallback(() => {
    form.resetField("transformersData.Resample")
    setResetKey((k) => k + 1)
  }, [form])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={cn("cursor-pointer text-base-content", className)}
      >
        <Cog className="w-[1.4rem]" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mt-0">Params of Resample</DialogTitle>
          <DialogDescription className="sr-only">
            change params of transformer
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6" key={resetKey}>
          <OrigFreqField form={form} />
          <NewFreqField form={form} />
          <ResamplingMethodField form={form} />
          <LowpassFilterWidthField form={form} />
          <RolloffField form={form} />
          <BetaField form={form} />
          <DtypeField form={form} />
        </div>

        <DialogFooter className="mt-4 flex flex-col sm:flex-col">
          <div className="flex items-center gap-1.5">
            <DialogClose className="w-full btn flex-3/4">Close</DialogClose>
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
