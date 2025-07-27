/**
 * So on each step user presses the next button.
 * But on each step we don't want to submit the data to the server.
 * %%%%% So this component solves that problem by introducing the following methodology.
 * > On each next step, apart from the last one, it will validate the form and will throw like an error on the screen. So it will take form as a prop.
 * > On the last one, it will not just validate the form but also submit it appropriately. So all the submissions will be done here, the calling of helpers and all.
 * IMP: Most important thing is that this component should be rendered inside the step provider because it will use the counter of it. 
 */

import React from "react";
import { StepBackButton, StepNextButton, useStepContext } from "~/components/StepNavigator";
import { cn } from "~/utils/general";
import type { UseFormReturn } from "react-hook-form";
import type { PipelineDL } from "~/types/pipelineDL";
import { useFormErrorContext } from "~/components/FormErrorShow/FormErrorContext";

type SubmitStepsProps = {
  form: UseFormReturn<PipelineDL>,
  /** a A function that will be called with a form argument and will return a boolean indicating the success in the check of the steps involved there. */
  isGoodToGoCallback: () => boolean,
} & React.ComponentProps<'div'>

/**
 * So, when there is error in the form error context, clicking the next button should give an error flag.
 *  So, it should click and should give an error flag and it should not navigate any further. 
 * It should not navigate any further. We should change it on the on click handle.
 * 
 * REMB: due to diff isGoodToGo functions, it will be diff for diff. steps.
 */
export function SubmitSteps({ className, form, isGoodToGoCallback, ...delegated}: SubmitStepsProps) {
  const { canGoNext, goNext } = useStepContext();
  const { error, shakeForError } = useFormErrorContext();

  const nextHandler = React.useCallback(() => {
    const stepSuccess = isGoodToGoCallback();
    if (stepSuccess) {
      goNext()
    } else {
      // each step will set the error when isGoodToGoCallback is called to the ErrorContext (if thers any)
      shakeForError()
    }
  }, [isGoodToGoCallback, goNext, shakeForError])

  return (
    <div
      aria-description=""
      className={cn(
        'flex justify-between',
        className
      )}
      {...delegated}
    >
      <StepBackButton />


      {canGoNext && (
        <button className="btn btn-primary" onClick={nextHandler} type="button">Next</button>
      )}
      {!error && !canGoNext && (
        <button className="btn btn-primary" type="submit">Submit</button>
      )}
    </div>
  )
}