import React from "react";
import { sectionSlugs } from "~/constants/pipelineDL";
import { TaskSection } from './sections/task/index'
import { PreProcessingSection } from "./sections/preProcessing";
import { ModelSection } from "./sections/model";
import { TrainingSection } from "./sections/training";
import { SummarySection } from "./sections/summary";
import type { Control } from "react-hook-form";
import type { PipelineDL } from "~/types/pipelineDL";
import * as z from 'zod/v4'


type SectionRouterProps = {
  section: typeof sectionSlugs[number],
  control: Control<PipelineDL>
} & React.ComponentProps<'div'>

export function SectionRouter({ section, ...delegated}: SectionRouterProps) {
  switch (section) {
    case 'task':
      return <TaskSection {...delegated} />
    case 'preProcessing':
      return <PreProcessingSection {...delegated} />
    case 'model':
      return <ModelSection {...delegated} />
    case 'training':
      return <TrainingSection {...delegated} />
    case 'summary':
      return <SummarySection {...delegated} />
  }
}