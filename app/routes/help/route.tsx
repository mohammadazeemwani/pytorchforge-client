import { LettersPullUp } from "~/components/TextAnimate"
import type { Route } from "./+types/route"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Help • PytorchForge" },
    {
      name: "description",
      content: "Look for help regarding PytorchForge",
    },
  ]
}

export default function Home() {
  return (
    <section
      className="prose dark:prose-invert"
    >
      <h1>
        <LettersPullUp 
          text="Help"
          className="h1-style"
        />
      </h1>
    </section>
  )
}
