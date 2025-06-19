import type { Route } from "./+types/route"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Inference • ML Pipelines" },
    {
      name: "description",
      content: "Do Inference for your ML Pipeline",
    },
  ]
}

export default function Home() {
  return (
    <section
      className="prose dark:prose-invert"
    >
      <h1>Inference of the pipeline will be done here..</h1>
    </section>
  )
}
