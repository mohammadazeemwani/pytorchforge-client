import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ML Pipelines" },
    { name: "description", content: "Make Pipelines for your next big AI thing" },
  ];
}

export default function Home() {
  return <></>;
}
