import React from "react"
import type { UseFormReturn } from "react-hook-form"
import { DnDContainer } from "~/components/DnD/DnDContainer"
import { DnDItem } from "~/components/DnD/DnDItem"
import type { PipelineDL } from "~/types/pipelineDL"
import { cn } from "~/utils/general"
import { MetricParamModifierComponent  } from "./metric-param-section.mapper"
import { useFormErrorContext } from "~/components/FormErrorShow/FormErrorContext"
import { ChevronRight, CircleAlert } from "lucide-react"

type MetricsListFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function MetricsListField({
  className,
  form,
  ...delegated
}: MetricsListFieldProps) {
  const metrics = form.watch("metrics")
  const { error } = useFormErrorContext()

  // cz error can be null.
  const issues = error?.issues ?? [];

  return (
    <div
      aria-description=""
      className={cn(className)}
      {...delegated}
    >
      {metrics?.length ? (
        <>
          <div
            className={cn(
              'bg-base-200 border border-base-300 rounded-box flex flex-col',
              "px-2 py-4 gap-2",
              'max-h-[56vh] overflow-y-scroll scroll-y-auto!',
            )}
          >
            <>
              {metrics.length > 0 &&
                metrics.map((metric) => {
                  const errorHere = issues.some(
                    e => e.path.includes("metricsData") && e.path.includes(metric)
                  )
                  return (
                    <div
                      key={metric}
                      id={metric}
                      className={cn(
                        'bg-base-100 flex items-center',
                        'border border-base-content/30 pl-1 sm:pl-[0.3rem] pr-2 py-1 rounded-field',
                        "gap-2 sm:gap-3 flex",
                        '',
                      )}
                    >
                      <span className="ml-1.5">
                        {metric}
                      </span>
                      <div className="ml-auto flex items-center gap-2">
                        {errorHere && (
                          <span className="text-[0.85rem] flex gap-1.5 items-center text-error rounded-selector bg-error/10 pl-2 pr-1">
                            <CircleAlert className="w-[0.8rem]" />
                            Error
                            <ChevronRight className="w-[0.8rem]" />
                          </span>
                        )}
                        <MetricParamModifierComponent 
                          name={metric}
                          props={{ 
                            form, 
                            className: cn(
                              'ml-0',
                              // gear will be red if no override happens in the children
                              errorHere && 'text-error'
                            ) 
                          }}
                        />
                      </div>
                    </div>
                  )
                })}
            </>
          </div>
        </>
      ) : (
        <span>Nothing selected yet..</span>
      )}
    </div>
  )
}
