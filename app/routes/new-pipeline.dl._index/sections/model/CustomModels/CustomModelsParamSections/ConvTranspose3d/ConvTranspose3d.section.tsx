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
import { InChannelsField } from "./InChannels.field"
import { OutChannelsField } from "./OutChannels.field"
import { KernelSizeField } from "./KernelSize.field"
import { StrideField } from "./Stride.field"
import { PaddingField } from "./Padding.field"
import { OutputPaddingField } from "./OutputPadding.field"
import { BiasField } from "./Bias.field"

/**
 * delegated props are not applied
 */
export function ConvTranspose3dSection({
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
          <DialogTitle className="mt-0">Params of ConvTranspose3d</DialogTitle>
          <DialogDescription className="sr-only">
            change params for custom model
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6" key={resetKey}>
          <InChannelsField form={form} index={index} />
          <OutChannelsField form={form} index={index} />
          <KernelSizeField form={form} index={index} />
          <StrideField form={form} index={index} />
          <PaddingField form={form} index={index} />
          <OutputPaddingField form={form} index={index} />
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
