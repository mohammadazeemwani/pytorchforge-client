import type { Route } from "./+types/route"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New Pipeline • ML Pipelines" },
    {
      name: "description",
      content: "Start new pipeline for your ML learning project",
    },
  ]
}

export default function Home() {
  return (
    <section
      className="prose dark:prose-invert"
    >
      <h1>New Pipeline code/form will be written here...</h1>
    </section>
  )
}
