import React from "react"
import type { UseFormReturn } from "react-hook-form"
import type { PipelineDL } from "~/types/pipelineDL"
import { cn } from "~/utils/general"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/Select"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/Form"
import { getAllowedAmplitudeToDB } from "~/helpers/pipelineDL"

type StypeFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function StypeField({ className, form, ...delegated }: StypeFieldProps) {
  const allowedStype = getAllowedAmplitudeToDB()

  return (
    <FormField
      control={form.control}
      name="transformersData.AmplitudeToDB.stype"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Stype</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select Stype" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {allowedStype.map((stype, i) => (
                <SelectItem key={i} value={stype}>
                  {stype}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
