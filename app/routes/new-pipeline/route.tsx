import { LettersPullUp } from "~/components/TextAnimate"
import type { Route } from "./+types/route"
import { cn } from "~/utils/general"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New Pipeline • ML Pipelines" },
    {
      name: "description",
      content: "Start new pipeline for your ML learning project",
    },
  ]
}

export default function NewPipeline({}: Route.ComponentProps) {
  return (
    <section
      className={cn(
        "prose dark:prose-invert",
      )}
    >
      <h1>
        <LettersPullUp 
          text="New Pipeline"
          className="h1-style"
        />
      </h1>
    </section>
  )
}
