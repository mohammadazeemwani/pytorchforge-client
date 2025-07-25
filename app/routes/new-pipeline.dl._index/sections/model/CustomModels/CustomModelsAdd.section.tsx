import React from "react";
import type { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import type { PipelineDL } from "~/types/pipelineDL";
import { cn } from "~/utils/general";
import { customModels } from "~/schema/pipelineDL.general";
import { CirclePlus, Plus } from "lucide-react";
import { customModelsEssentialDefaults } from "~/helpers/pipelineDL";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "~/components/Command"
import { Gloss } from "~/components/Gloss";

type CustomModelsAddProps = {
  form: UseFormReturn<PipelineDL>,
  fieldArrayOptions: UseFieldArrayReturn<PipelineDL, 'customModels'>
} & React.ComponentProps<typeof Command>

export function CustomModelsAdd({ form, fieldArrayOptions, className, ...delegated}: CustomModelsAddProps) {

  const { fields, append } = fieldArrayOptions

  return (
    <div
      className={cn(
        'prose dark:prose-invert',
        className
      )}
      {...delegated}
    >
    <h3>Custom model</h3>
    <Command className="h-fit">
      <CommandInput placeholder="Search layers..." containerClass="h-10" className="h-10" />
      <CommandList
        className="max-h-[19rem] sm:max-h-[22rem]"  
      >
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Layers" className="sm:pr-0">
          {customModels.map((model, _) => {
            const handleLayerAddition = React.useCallback(() => {
              // console.log('handle clicked for', model)
              append(customModelsEssentialDefaults[model] as any) // keep it any.
            }, [model, customModelsEssentialDefaults])

            return (
              <CommandItem key={model} className="flex">
                <div
                  className="z-0 max-w-[65%] mr-auto tooltip"
                  data-tip={model}
                >
                  <Gloss maxChars={21} tail=".." text={model} />
                </div>
                <button 
                  type="button"
                  className="z-1 btn btn-xs! flex items-center gap-1.5" 
                  onClick={handleLayerAddition}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      e.stopPropagation();
                      handleLayerAddition();
                    }
                  }}
                >
                  <span>Add</span>
                  <Plus width={0.2} />
                </button>
              </CommandItem>
            ) 
          })}
        </CommandGroup>
      </CommandList>
    </Command>
    </div>
  )
}