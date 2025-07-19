import React from "react"
import { cn } from "~/utils/general"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/Form"
import type { UseFormReturn } from "react-hook-form"
import type { PipelineDL } from "~/types/pipelineDL"
import { InputNumber } from "~/components/InputNumber"

type UpscaleFactorFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function UpscaleFactorField({
  className,
  form,
  ...delegated
}: UpscaleFactorFieldProps) {
  return (
    <FormField
      control={form.control}
      name="customModelsData.PixelShuffle.upscale_factor"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Upscale factor</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
