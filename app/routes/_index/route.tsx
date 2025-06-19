import type { Route } from "./+types/route"
import { HeroSection } from "./HeroSection"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ML Pipelines" },
    {
      name: "description",
      content: "Make Pipelines for your next big AI thing",
    },
  ]
}

export default function Home() {
  return (
    <section
      className="flex flex-col items-center"
    >
      <HeroSection />
    </section>
  )
}
