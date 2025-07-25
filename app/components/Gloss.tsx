import React from "react";
import { cn } from "~/utils/general";

type GlossProps = {
  text?: string,
  /** Inclusive of ellipses */
  maxChars?: number,

  /** 
   * example: ... will be treted as 3 chareters inclusive in maxChars
   */
  tail?: string,
} & React.ComponentProps<'span'>

export function Gloss({ text, maxChars=20, tail='...', className, ...delegated}: GlossProps) {
  if (!text) return null;
  const slicingLength = maxChars - tail.length;
  const displayText = text.length > maxChars ? text.slice(0, slicingLength) + tail : text;

  return (
    <span
      className={cn(
        className
      )}
      {...delegated}
    >
      {displayText}
    </span>
  )
}