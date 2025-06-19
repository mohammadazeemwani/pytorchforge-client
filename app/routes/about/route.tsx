import type { Route } from "./+types/route"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About • ML Pipelines" },
    {
      name: "description",
      content: "Learn about ML Pipelines, its maintainers and vision..",
    },
  ]
}

export default function Home() {
  return (
    <section
      className="prose dark:prose-invert"
    >
      <h1>About Page</h1>
    </section>
  )
}
