import React from "react"
import type { ZodError } from "zod/v4"
import { motion, type Variant, type Variants } from "motion/react"
import { cn } from "~/utils/general"
import { formShakeErrorDuration as defShakeDur } from "~/constants/general"
import { formVibrateErrorDuration as defVibrDur } from "~/constants/general"
import type { UseFormReturn, UseFormSetError } from "react-hook-form"
import type { PipelineDL } from "~/types/pipelineDL"
type FormErrorContext = {
  error: ZodError<any> | null // yes it can be any, cz what fields are in which step should not effect it
  setError: React.Dispatch<React.SetStateAction<ZodError<any> | null>>;
  
  /** duration for shake can be changed on the FormErrorContext provider */
  shakeForError: () => void,
}

export const FormErrorContext = React.createContext<FormErrorContext | null>(
  null,
)

type FormErrorProvider = {
  children: React.ReactNode
  /** in seconds, like: 0.4 */
  durationShake?: number
  /** in ms, like: 200 */
  durationVibrate?: number[],
}

export function FormErrorProvider({
  children,
  durationShake = defShakeDur,
  durationVibrate = defVibrDur,
}: FormErrorProvider) {
  const [error, setError] = React.useState<FormErrorContext["error"]>(null)
  const shakeVariants = React.useMemo(() => {
    return {
      shake: {
        x: [0, -5, 5, -5, 5, 0],
        y: [0, -5, 5, -5, 5, 0],
        transition: {
          type: "tween",
          duration: durationShake,
          ease: 'easeInOut',
        },
      },
      still: {
        x: 0,
        y: 0,
      },
    } as Variants
  }, [durationShake])

  const [shake, setShake] = React.useState(false)
  const shakeForError = React.useCallback(() => {
    setShake(true)
    // don't do any stupid timeout thing here.
    // change the state of shake on animation complete
  }, [setShake])

  React.useEffect(() => {
    if (shake) {
      // do the vibration stuff and root bg change.
      if (navigator.vibrate) navigator.vibrate(durationVibrate);
      document.documentElement.classList.add('error-glow')
    } else {
      document.documentElement.classList.remove('error-glow')
    }
  }, [shake])

  return (
    <FormErrorContext.Provider
      value={{
        error,
        setError,
        shakeForError,
      }}
    >
      <motion.div 
        variants={shakeVariants} 
        animate={shake ? "shake" : "idle"}
        onAnimationComplete={() => setShake(false)}
      >
        {children}
      </motion.div>
    </FormErrorContext.Provider>
  )
}


export function useFormErrorContext() {
  const formContext = React.useContext(FormErrorContext)
  if (!formContext) {
    throw new Error(
      "useFormErrorContext has to be in side of FormErrorProvider",
    )
  }

  return formContext
}
