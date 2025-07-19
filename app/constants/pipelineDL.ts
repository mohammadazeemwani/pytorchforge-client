import { objectKeys } from "ts-extras"
import type { MainTask } from "~/types/pipelineDL";

export const defaultTask: MainTask = 'image'

/** Order matters. here */
export const sectionSlugToLabel = {
  "model": "Model", // 4
  'dataLoading': "Data Loading", // 3
  "task": "Task", // 1
  "preProcessing": "Pre Processing", // 2
  "training": "Training", // 5
  "summary": "Summary", // 6
}

export const sectionSlugs = objectKeys(sectionSlugToLabel);
export const sectionCount = sectionSlugs.length;