import React from "react";
import type { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import { DnDContainer } from "~/components/DnD/DnDContainer";
import type { PipelineDL } from "~/types/pipelineDL";
import { cn } from "~/utils/general";
import type { DnDContainerProps } from "~/components/DnD/DnDContainer";
import { DnDItem } from "~/components/DnD/DnDItem";
import { Trash2 } from "~/components/AnimatedIcons";
import { CustomModelParamModifierComponent } from "./customModels-section.mapper";
import { useFormErrorContext } from "~/components/FormErrorShow/FormErrorContext";
import { ChevronRight, CircleAlert } from "lucide-react";

type CustomModelsReorderProps = {
  form: UseFormReturn<PipelineDL>,
  fieldArrayOptions: UseFieldArrayReturn<PipelineDL, 'customModels'>
} & React.ComponentProps<'div'>

export function CustomModelsReorder({ form, fieldArrayOptions, className, ...delegated}: CustomModelsReorderProps) {
  
  const { fields, move, remove } = fieldArrayOptions;

  const { error } = useFormErrorContext()
  // cz error can be null.
  const issues = error?.issues ?? [];

  const onMove = React.useCallback<NonNullable<DnDContainerProps['move']>>((from, to) => {
    move?.(from, to)
  }, [form])

  return (
    <div
      aria-description=""
      className={cn(
        'prose dark:prose-invert',
        className
      )}
      {...delegated}
    >
      <h3>Layers</h3>
      {fields.length > 0 ? (
        <DnDContainer
          items={fields.map(f => f.id)}
          move={onMove}
          className={cn(
            "px-2 py-4 gap-2",
            'max-h-[56vh] overflow-y-scroll scroll-auto!',
          )}
        >
          {fields.map((field, index) => {
            const errorHere = issues.some(
              e => e.path.includes("customModels") && e.path.includes(index)
            )

            return (
              <DnDItem 
                key={field.id}
                id={field.id}
                className={cn(
                  "gap-2 sm:gap-3",
                  '',
                )}
              >
                <span className="mr-auto">
                  {field.name}
                </span>
                <button 
                  title="delete this layer"
                  className="cursor-pointer sm:mr-0.5"
                  type="button" 
                  onClick={() => {
                    remove(index)
                  }}
                >
                  <Trash2 className="text-error w-[1.3rem]"/>
                </button>

                <div className="flex items-center gap-2">
                  {errorHere && (
                    <span className="text-[0.85rem] flex gap-1.5 items-center text-error rounded-selector bg-error/10 pl-2 pr-1">
                      <CircleAlert className="w-[0.8rem]" />
                      Error
                      <ChevronRight className="w-[0.8rem]" />
                    </span>
                  )}
                  <CustomModelParamModifierComponent 
                    modelName={field.name}
                    props={{ 
                      form, 
                      index,
                      className: cn(
                        'ml-0',
                        errorHere && 'text-error'
                      ) 
                    }}
                  />
                </div>
              </DnDItem>
            )
          })}
        </DnDContainer>
      ) : (
        <span>Add a layer to adjust</span>
      )}
    </div>
  )
}