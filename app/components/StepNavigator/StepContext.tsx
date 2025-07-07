import React from "react";
type StepContext = {
  currentStep: number,
  goNext: () => void,
  goBack: () => void,
  goTo: (target: number) => void,
  canGoNext: boolean,
  canGoBack: boolean
}
export const StepContext = React.createContext<StepContext | null>(null)

type StepContextProviderProps = {
  /** Start counting from One. */
  totalSteps: number,
  children: React.ReactNode
}
export function StepContextProvider ({
  totalSteps,
  children
}: StepContextProviderProps) {
  const [currentStep, setCurrentStep] = React.useState(1);

  /** use canGoNext and canGoBack to render disable states for Next and Back buttons resp. */
  const goNext = React.useCallback(() => {
    setCurrentStep((c) => {
      if (c > totalSteps) return c
      else return c+1;
    })
  }, [totalSteps])

  const goBack = React.useCallback(() => {
    setCurrentStep((c) => {
      if (c < 1) return c
      else return c-1;
    })
  }, [])

  const goTo = React.useCallback((target: number) => {
    if (target < 1) setCurrentStep(1)
    else if (target > totalSteps) setCurrentStep(totalSteps)
    else setCurrentStep(target)
  }, [])

  /** It is a utility function to let the UI declare the next button disable ahead of time */
  const canGoNext = React.useMemo(() => {
    return currentStep < totalSteps
  }, [currentStep, totalSteps])
  const canGoBack = React.useMemo(() => {
    return currentStep > 1
  }, [currentStep])

  return (
    <StepContext.Provider
      value={{
        /** Can be used to render view accordingly */
        currentStep,
        
        goNext,
        goBack,
        goTo,

        canGoNext,
        canGoBack
      }}
    >
      {children}
    </StepContext.Provider>
  )
}


/** A little hook; because typescirpt will infer that the state is null at start and won't show typings */
export function useStepContext () {
  const stepContext = React.useContext(StepContext);
  if (!stepContext) {
    throw new Error('useStepContext has to be used inside StepContextProvider')
  }
  return stepContext;
}