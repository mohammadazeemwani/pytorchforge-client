import React from "react"
import type { UseFormReturn } from "react-hook-form"
import { DnDContainer } from "~/components/DnD/DnDContainer"
import { DnDItem } from "~/components/DnD/DnDItem"
import type { PipelineDL } from "~/types/pipelineDL"
import { cn } from "~/utils/general"
import { getTransformerParamModifierComponent } from "./transformers-param-section.mapper"

type TransformersReorderProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function TransformersReorder({
  className,
  form,
  ...delegated
}: TransformersReorderProps) {
  const transformers = form.watch("transformers")

  const onUpdate = React.useCallback(
    (newValues: any) => {
      form.setValue("transformers", newValues)
    },
    [form],
  )

  return (
    <div
      aria-description=""
      className={cn("prose dark:prose-invert", className)}
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
                transformers.map((transformer) => (
                  <DnDItem
                    key={transformer}
                    id={transformer}
                    className={cn("gap-3")}
                    gearChildren={getTransformerParamModifierComponent(
                      transformer,
                      { form },
                    )}
                    gearChildTitle={`Params of ${transformer}`}
                  >
                    {transformer}
                  </DnDItem>
                ))}
            </>
          </DnDContainer>
        </>
      ) : (
        <span>Oops, Nothing selected yet..</span>
      )}
    </div>
  )
}
