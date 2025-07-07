import React from "react"
import { cn } from "~/utils/general"
import { MainLogo } from "~/components/MainLogo"
import { LettersPullUp } from "~/components/TextAnimate"
import { MainLinksBarForHome } from "~/components/MainLinksBar/MainLinksBarForHome"
import MainLinksBar from "~/components/MainLinksBar"
import { Link } from "react-router"

type HeroSectionProps = {} & React.ComponentProps<"section">

export function HeroSection({ className, ...delegated }: HeroSectionProps) {
  return (
    <section
      className={cn(
        'mt-[0.8rem]',
        "prose dark:prose-invert",
        "flex flex-col justify-start items-center",
        className,
      )}
      {...delegated}
    >
      <div
        aria-roledescription="serves as a container for heading"
        className="flex flex-col gap-2 sm:gap-2 md:gap-0 justify-between mt-[0.5rem]"
      >
        <LettersPullUp
          text="Visual Platform for"
          className="h1-style"
        />
        <LettersPullUp
          text="deep learning"
          className="h1-style"
        />
      </div>
      <Link to="/about" className="mt-[1.4rem] mb-[2.4rem]">
        <MainLogo className="w-[10rem] h-[10rem] sm:w-[12.5rem] sm:h-[12.5rem] not-prose" />
      </Link>
      <MainLinksBar showForMainPage={true} className=""/>
    </section>
  )
}
