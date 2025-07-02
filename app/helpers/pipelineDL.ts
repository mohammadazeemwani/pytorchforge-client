import { pipelineDLSchema } from "~/schema/pipelineDL"
import type { MainTask } from "~/types/pipelineDL"

/**
 *
 * @param mainTask to get the default values for..
 */
export function getDefaultPipelineDLSchema<T extends MainTask>(mainTask: T) {
  /**
   * This is the minimal stuff that is required to get the default object for given maintask
   */
  const minimal = { mainTask }
  const result = pipelineDLSchema.parse(minimal)
  return result
}
