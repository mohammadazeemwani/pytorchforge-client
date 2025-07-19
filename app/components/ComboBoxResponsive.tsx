import * as React from "react"

import { useMediaQuery } from "~/hooks/useMediaQuery"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/Command"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "~/components/Drawer"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/Popover"
import { cn } from "~/utils/general"
import { Check, ChevronsUpDown } from "lucide-react"

export type Value = {
  value: string
  label: string
}

type ComboBoxResponsiveProps = {
  /** className will be applied to trigger button */
  className?: string,
  values: Value[],
  label?: string,

  // the value we will set is the label in type Value.
  selectedValue: Value | undefined,
  setSelectedValue: React.Dispatch<React.SetStateAction<Value | undefined>>
}
export function ComboBoxResponsive({className, values, label='Choose here', selectedValue, setSelectedValue}: ComboBoxResponsiveProps) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            className={cn(
              "btn btn-outline w-fit justify-start",
              className
            )}
          >
            {selectedValue ? <>{selectedValue.label}</> : <>{label}</>}
            <ChevronsUpDown size={16} className="opacity-50 ml-auto" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <StatusList values={values} setOpen={setOpen} setSelectedValue={setSelectedValue} />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button
          className={cn(
            "btn btn-outline w-fit justify-start",
            className
          )}
        >
          {selectedValue ? <>{selectedValue.label}</> : <>{label}</>}
          <ChevronsUpDown size={16} className="opacity-50 ml-auto" />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList values={values} setOpen={setOpen} setSelectedValue={setSelectedValue} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function StatusList({
  setOpen,
  setSelectedValue,
  values,
}: {
  setOpen: (open: boolean) => void
  setSelectedValue: (status: Value | undefined) => void,
  values: Value[]
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {values.map((value) => (
            <CommandItem
              key={value.value}
              value={value.value}
              onSelect={(value) => {
                setSelectedValue(
                  values.find((priority) => priority.value === value) || undefined
                )
                setOpen(false)
              }}
            >
              {value.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
