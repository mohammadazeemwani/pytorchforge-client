import React from "react"
import { cn } from "~/utils/general"
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
import type { MetricSectionProps } from "../../metric-param-section.mapper"
import { TaskField } from "./Task.field"
import { NumClassesField } from "./NumClasses.field"
import { ThresholdField } from "./Threshold.field"
import { TopKField } from "./TopK.field"
import { AverageField } from "./Average.field"

export function RecallSection({
  form,
  className,
  ...delegated
}: MetricSectionProps) {

  const [open, setOpen] = React.useState(false)
  const [resetKey, setResetKey] = React.useState(0)

  const { error } = form.getFieldState(
    "metricsData.Recall",
    form.formState,
  )

  const resetSection = React.useCallback(() => {
    form.resetField("metricsData.Recall")
    setResetKey((k) => k + 1)
  }, [form])

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger title="adjust this metric" className={cn("cursor-pointer text-base-content", className)}>
        <Cog className="w-[1.4rem]" />
      </DialogTrigger>
      <DialogContent
        className={cn("prose dark:prose-invert", "")}
      >
        <DialogHeader>
          <DialogTitle className="mt-0">Params of Recall</DialogTitle>
          <DialogDescription className="sr-only">
            change params for metric
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6" key={resetKey}>
          <TaskField form={form} />
          <NumClassesField form={form} />
          <ThresholdField form={form} />
          <TopKField form={form} />
          <AverageField form={form} />
        </div>

        <DialogFooter className="mt-4 flex flex-col sm:flex-col">
          <div className="flex items-center gap-1.5">
            <DialogClose className="w-full btn flex-3/4">
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
