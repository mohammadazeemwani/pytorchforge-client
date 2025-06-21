import React from "react"
import { cn } from "~/utils/general"
import { MainLogo } from "~/components/MainLogo"
import { LettersPullUp } from "~/components/TextAnimate"
import { MainLinksBarForHome } from "~/components/MainLinksBar/MainLinksBarForHome"
import MainLinksBar from "~/components/MainLinksBar"

type HeroSectionProps = {} & React.ComponentProps<"section">

export function HeroSection({ className, ...delegated }: HeroSectionProps) {
  return (
    <section
      className={cn(
        "prose dark:prose-invert",
        "flex flex-col justify-start items-center",
        className,
      )}
      {...delegated}
    >
      <div
        aria-roledescription="serves as a container for heading"
        className="flex flex-col gap-2 justify-between mt-[0.5rem]"
      >
        <LettersPullUp
          text="Visual Platform for"
          className="text-base-content text-4xl sm:text-5xl md:text-5xl"
        />
        <LettersPullUp
          text="deep learning"
          className="text-base-content text-4xl sm:text-5xl md:text-5xl"
        />
      </div>
      <MainLogo className="w-[14rem] not-prose my-4" />
      <MainLinksBar showForMainPage={true} className=""/>
    </section>
  )
}
