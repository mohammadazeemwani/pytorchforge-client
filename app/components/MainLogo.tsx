/**
 * The main purpose of this is to get a common component to animate.
 */

import React from "react";
import { motion} from "motion/react";
import { type MotionProps } from "motion/react";
import { cn } from "~/utils/general";

type MainLogoProps = { } & React.ComponentProps<'div'> & MotionProps

export function MainLogo({ className, ...delegated }: MainLogoProps) {

  return (
    <motion.div 
      className={cn(
        '',
        className
      )}
      layoutId="main-logo"
      layout="preserve-aspect"
      transition={{ type: 'spring', duration: 1.1, stiffness: 400, damping: 60 , restDelta: 0.001}}
      {...delegated}
    >
      <img src="/logo-light.svg" className="h-full w-full block dark:hidden" />
      <img src="/logo-dark.svg" className="h-full w-full hidden dark:block" />
    </motion.div>
  )
}
