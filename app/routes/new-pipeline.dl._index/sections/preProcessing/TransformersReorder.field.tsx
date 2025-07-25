import React from "react"
import type { UseFormReturn } from "react-hook-form"
import { DnDContainer } from "~/components/DnD/DnDContainer"
import { DnDItem } from "~/components/DnD/DnDItem"
import type { PipelineDL } from "~/types/pipelineDL"
import { cn } from "~/utils/general"
import { TransformerParamModifierComponent } from "./transformers-param-section.mapper"
import { useFormErrorContext } from "~/components/FormErrorShow/FormErrorContext"
import { ChevronRight, CircleAlert } from "lucide-react"

type TransformersReorderProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function TransformersReorder({
  className,
  form,
  ...delegated
}: TransformersReorderProps) {
  const transformers = form.watch("transformers")
  const { error } = useFormErrorContext()

  // cz error can be null.
  const issues = error?.issues ?? [];

  const onUpdate = React.useCallback(
    (newValues: any) => {
      form.setValue("transformers", newValues)
    },
    [form],
  )

  return (
    <div
      aria-description=""
      className={cn(className)}
      {...delegated}
    >
      {transformers?.length ? (
        <>
          <DnDContainer
            items={transformers}
            onUpdate={onUpdate}
            className={cn("px-2 py-4 gap-2")}
          >
            <>
              {transformers.length > 0 &&
                transformers.map((transformer) => {
                  const errorHere = issues.some(
                    e => e.path.includes("transformersData") && e.path.includes(transformer)
                  )
                  return (
                    <DnDItem
                      key={transformer}
                      id={transformer}
                      className={cn(
                        "gap-3",
                        "flex"
                      )}
                    >
                      <span>
                        {transformer}
                      </span>
                      <div className="ml-auto flex items-center gap-2">
                        {errorHere && (
                          <span className="text-[0.85rem] flex gap-1.5 items-center text-error rounded-selector bg-error/10 pl-2 pr-1">
                            <CircleAlert className="w-[0.8rem]" />
                            Error
                            <ChevronRight className="w-[0.8rem]" />
                          </span>
                        )}
                        <TransformerParamModifierComponent 
                          transformerName={transformer}
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
                    </DnDItem>
                  )
                })}
            </>
          </DnDContainer>
        </>
      ) : (
        <span>Nothing selected yet..</span>
      )}
    </div>
  )
}
