import React from "react";
import { cn } from "~/utils/general";
import { vision } from "./about-data";
import { TextFade } from "~/components/TextAnimate";

type VisionSectionProps = {} & React.ComponentProps<'section'>

export function VisionSection({ className, ...delegated}: VisionSectionProps) {
  return (
    <section
      aria-description="Vision of ML Pipelines"
      id="vision-section"
      className={cn(
        'prose dark:prose-invert',
        'mt-15 sm:mt-15',
        className
      )}
      {...delegated}
    >
      <TextFade 
        direction="up"
        useInViewOptions={{
          once: false,
          margin: '0% 0% -28% 0%'
        }}
      >
        <h2>Vision</h2>
        {vision.map((sentence, i) => (
          <p key={i}>{sentence}</p>
        ))}
      </TextFade>
    </section>
  )
}