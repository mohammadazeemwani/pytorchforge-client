import React from "react";
import { cn } from "~/utils/general";
import { Input } from "./Input";
import type { ControllerRenderProps } from "react-hook-form";

type InputNumberProps = {
  field: ControllerRenderProps<any, any>
} & Omit<React.ComponentProps<typeof Input>, 'value' | 'onChange'>

export function InputNumber({ field, ...delegated}: InputNumberProps) {
  return (
    <Input 
      {...delegated}
      {...field}
      type="number"
      /** Otherwise we get into an error of components changing from uncontrolled to controlled state. */
      value={field.value ?? ''} 
      onChange={(e) => {
        field.onChange(Number(e.target.value))
      }}
    />
  )
}