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
import { VocabField } from "./Vocab.field"

/**
 * delegated props are not applied
 */
export function VocabTransformSection({
  className,
  form,
  ...delegated
}: TransformerFieldProps) {
  const [open, setOpen] = React.useState(false)
  const [resetKey, setResetKey] = React.useState(0)

  const { error } = form.getFieldState(
    "transformersData.VocabTransform",
    form.formState,
  )

  const resetSection = React.useCallback(() => {
    form.resetField("transformersData.VocabTransform")
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
          <DialogTitle className="mt-0">Params of Vocab transform</DialogTitle>
          <DialogDescription className="sr-only">
            change params of transformer
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6" key={resetKey}>
          <VocabField form={form} />
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
