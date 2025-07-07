import { cn } from "~/utils/general"
import type { Route } from "./+types/route"
import { LettersPullUp } from "~/components/TextAnimate"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Inference • PytorchForge" },
    {
      name: "description",
      content: "Do Inference for your PytorchForge",
    },
  ]
}

export default function Inference() {
  return (
    <section
      className={cn(
        "prose dark:prose-invert",
      )}
    >
      <h1>
        <LettersPullUp 
          text="Inference"
          className="h1-style"
        />
      </h1>
    </section>
  )
}
