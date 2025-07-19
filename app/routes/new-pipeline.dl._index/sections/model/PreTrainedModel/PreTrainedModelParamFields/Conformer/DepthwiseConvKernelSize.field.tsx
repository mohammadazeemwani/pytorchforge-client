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
import { InputNumber } from "~/components/InputNumber";


type DepthwiseConvKernelSizeFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function DepthwiseConvKernelSizeField({ className, form, ...delegated }: DepthwiseConvKernelSizeFieldProps) {
  return (
    <FormField
      control={form.control}
      name="pretrainedModelsData.Conformer.depthwise_conv_kernel_size"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Depthwise Convolution Kernel Size</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
