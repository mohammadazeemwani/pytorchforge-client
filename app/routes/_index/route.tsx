import type { Route } from "./+types/route"
import { HeroSection } from "./HeroSection"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "PytorchForge" },
    {
      name: "description",
      content: "Make Pipelines for your next big AI thing",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://pipeline-ui.pages.dev" },
    { property: "og:image", content: "/open-graph.png" }
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
