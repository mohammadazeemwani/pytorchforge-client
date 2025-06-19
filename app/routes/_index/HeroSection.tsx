import React from "react";
import { cn } from "~/utils/general";
import { MainLogo } from "~/components/MainLogo";
import { LettersPullUp } from "~/components/TextAnimate";

type HeroSectionProps = {} & React.ComponentProps<'section'>

export function HeroSection({ className, ...delegated }: HeroSectionProps) {
  return (
    <section
      className={cn(
        'prose dark:prose-invert',
        'flex flex-col justify-start items-center',
        className
      )}
      {...delegated}
    >
      <div 
        aria-roledescription="serves as a container for heading"
        className="flex flex-col gap-2 justify-between"
      >
        <LettersPullUp text="Visual Platform for" className="text-4xl"/>
        <LettersPullUp text="deep learning" className="text-4xl"/>
      </div>
      <MainLogo className="scale-[0.5] not-prose mt-[-5rem]" />
    </section>
  )
}