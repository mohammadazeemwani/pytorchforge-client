/**
 * The main purpose of this is to get a common component to animate.
 */

import React from "react";
import { motion} from "motion/react";
import { type MotionProps } from "motion/react";
import { cn } from "~/utils/general";

type MainLogoProps = { } & React.ComponentProps<'div'> & MotionProps

export function MainLogo({ className }: MainLogoProps) {
  return (
    <motion.div 
      className={cn(
        '',
        className
      )}
      layoutId="main-logo"
      layout="preserve-aspect"
    >
      <img src="logo.svg" className="h-full w-full" />
    </motion.div>
  )
}
