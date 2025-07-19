import React from "react"
import type { UseFormReturn } from "react-hook-form"
import { DnDContainer } from "~/components/DnD/DnDContainer"
import { DnDItem } from "~/components/DnD/DnDItem"
import type { PipelineDL } from "~/types/pipelineDL"
import { cn } from "~/utils/general"
import { CustomModelParamModifierComponent } from "./customModels-section.mapper"
import { useFormErrorContext } from "~/components/FormErrorShow/FormErrorContext"
import { ChevronRight, CircleAlert } from "lucide-react"

type CustomModelsReorderProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function CustomModelsReorder({
  className,
  form,
  ...delegated
}: CustomModelsReorderProps) {
  const customModels = form.watch("customModels")
  const { error } = useFormErrorContext()

  // cz error can be null.
  const issues = error?.issues ?? [];

  const onUpdate = React.useCallback(
    (newValues: any) => {
      form.setValue("customModels", newValues)
    },
    [form],
  )

  return (
    <div
      aria-description=""
      className={cn("prose dark:prose-invert", className)}
      {...delegated}
    >
      {customModels?.length ? (
        <>
          <DnDContainer
            items={customModels}
            onUpdate={onUpdate}
            className={cn("px-2 py-4 gap-2")}
          >
            <>
              {customModels.length > 0 &&
                customModels.map((customModel) => {
                  const errorHere = issues.some(
                    e => e.path.includes("customModelsData") && e.path.includes(customModel)
                  )
                  return (
                    <DnDItem
                      key={customModel}
                      id={customModel}
                      className={cn(
                        "gap-3",
                        'flex',
                        // !!errorHere ? 'bg-error/10 border-error' : ''
                      )}
                    >
                      <span>
                        {customModel}
                      </span>
                      <div className="ml-auto flex items-center gap-2">
                        {errorHere && (
                          <span className="text-[0.85rem] flex gap-1.5 items-center text-error rounded-selector bg-error/10 pl-2 pr-1">
                            <CircleAlert className="w-[0.8rem]" />
                            Error
                            <ChevronRight className="w-[0.8rem]" />
                          </span>
                        )}
                        <CustomModelParamModifierComponent 
                          modelName={customModel}
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
