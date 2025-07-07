import { LettersPullUp } from "~/components/TextAnimate"
import type { Route } from "./+types/route"
import { MembersSection } from "./MembersSection"
import { VisionSection } from "./VisionSection"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About • PytorchForge" },
    {
      name: "description",
      content: "Learn about PytorchForge, its maintainers and vision..",
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
          text="About"
          className="h1-style"
        />
      </h1>
      <MembersSection />
      <VisionSection />
    </section>
  )
}
