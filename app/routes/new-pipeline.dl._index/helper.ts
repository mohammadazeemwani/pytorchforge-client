import { pipelineDLSchema } from "~/schema/pipelineDL";
import { z } from "zod/v4";

export function onSubmit(values: z.infer<typeof pipelineDLSchema>) {
  console.log(
    'Form submitted and validated values are',
    values
  )
}

