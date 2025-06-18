import type { Route } from "./+types/home"
import { MainLogo } from "~/components/MainLogo"

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
      <MainLogo className="w-[14rem]" />
    </section>
  )
}
