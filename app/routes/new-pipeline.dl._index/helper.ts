import type { SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import type { PipelineDL } from "~/types/pipelineDL";

export const onSubmit: SubmitHandler<PipelineDL> = async (data) => {
  console.log(
    'Form submitted and validated values are',
    data
  )
}

export const onError: SubmitErrorHandler<PipelineDL> = async (errors) => {

  // make a error component and render that instead of logging in future.
  console.log(
    'Form submition errors',
    errors
  )
}

