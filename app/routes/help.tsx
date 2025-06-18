import type { Route } from "./+types/help"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Help • ML Pipelines" },
    {
      name: "description",
      content: "Look for help regarding ML Pipelines",
    },
  ]
}

export default function Home() {
  return (
    <section
      className="prose dark:prose-invert"
    >
      <h1>Help Page</h1>
    </section>
  )
}
