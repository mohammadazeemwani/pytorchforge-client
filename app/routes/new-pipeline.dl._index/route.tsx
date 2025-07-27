import React from "react"
import type { Route } from "./+types/route"
import { sectionCount } from "~/constants/pipelineDL"
import { StepContextProvider } from "~/components/StepNavigator"
import { DL } from "./DL"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Deep Learning • PytorchForge" },
    {
      name: "description",
      content: "Forge a script for you deep learning pipeline",
    },
  ]
}

export default function Home({}: Route.ComponentProps) {
  return (
    <StepContextProvider totalSteps={sectionCount}>
      <DL />
    </StepContextProvider>
  )
}
