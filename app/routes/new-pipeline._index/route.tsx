import { LettersPullUp } from "~/components/TextAnimate"
import type { Route } from "./+types/route"
import { cn } from "~/utils/general"
import { PipelinesEntry } from "./PipelinesEntry"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New Pipeline • PytorchForge" },
    {
      name: "description",
      content: "Start new pipeline for your Machine learning project",
    },
  ]
}

export default function NewPipeline({}: Route.ComponentProps) {
  return (
    <section
      className={cn(
        "flex flex-col items-center",
      )}
    >
      <h1 className="prose dark:prose-invert">
        <LettersPullUp 
          text="New Pipeline"
          className="h1-style"
        />
      </h1>
      <PipelinesEntry />
    </section>
  )
}
