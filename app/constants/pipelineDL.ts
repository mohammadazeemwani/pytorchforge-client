import { objectKeys } from "ts-extras"

/** Order matters. here */
export const sectionSlugToLabel = {
  "task": "Task",
  "preProcessing": "Pre Processing",
  "model": "Model",
  "training": "Training",
  "summary": "Summary"
}

export const sectionSlugs = objectKeys(sectionSlugToLabel);
export const sectionCount = sectionSlugs.length;