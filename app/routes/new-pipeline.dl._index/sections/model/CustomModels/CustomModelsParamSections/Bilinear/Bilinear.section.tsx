import React from "react"
import { cn } from "~/utils/general"
import type { CustomModelsFieldProps } from "../../customModels-section.mapper"
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
import { In1FeaturesField } from "./In1Features.field"
import { In2FeaturesField } from "./In2Features.field"
import { OutFeaturesField } from "./OutFeatures.field"
import { BiasField } from "./Bias.field"

/**
 * delegated props are not applied
 */
export function BilinearSection({
  className,
  form,
  index,
  ...delegated
}: CustomModelsFieldProps) {
  const [open, setOpen] = React.useState(false)
  const [resetKey, setResetKey] = React.useState(0)

  const { error } = form.getFieldState(`customModels.${index}`, form.formState)

  const resetSection = React.useCallback(() => {
    form.resetField(`customModels.${index}`)
    setResetKey((k) => k + 1)
  }, [form, index])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        title="adjust this layer"
        className={cn("cursor-pointer text-base-content", className)}
      >
        <Cog className="w-[1.4rem]" />
      </DialogTrigger>
      <DialogContent className={cn("prose dark:prose-invert", "")}>
        <DialogHeader>
          <DialogTitle className="mt-0">Params of Bilinear</DialogTitle>
          <DialogDescription className="sr-only">
            change params for custom model
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6" key={resetKey}>
          <In1FeaturesField form={form} index={index} />
          <In2FeaturesField form={form} index={index} />
          <OutFeaturesField form={form} index={index} />
          <BiasField form={form} index={index} />
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
