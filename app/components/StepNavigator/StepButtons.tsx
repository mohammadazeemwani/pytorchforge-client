import React from "react";
import { cn } from "~/utils/general";
import { useStepContext } from "./StepContext";

type StepNextButtonProps = {
  label?: string
} & React.ComponentProps<'button'>

export function StepNextButton({ label="Next", className, ...delegated}: StepNextButtonProps) {
  const { goNext, canGoNext } = useStepContext();

  return (
    <button
      aria-description=""
      className={cn(
        'btn btn-primary',
        className
      )}
      disabled={!canGoNext}
      onClick={() => goNext()}
      {...delegated}
    >
      {label}
    </button>
  )
}

type StepBackButtonProps = {
  label?: string,
} & React.ComponentProps<'button'>

export function StepBackButton({ label="Back", className, ...delegated}: StepBackButtonProps) {
  const { goBack, canGoBack } = useStepContext()

  return (
    <button
      aria-description=""
      className={cn(
        'btn btn-soft btn-primary',
        className
      )}
      disabled={!canGoBack}
      onClick={() => goBack()}
      {...delegated}
    >
      {label}
    </button>
  )
}