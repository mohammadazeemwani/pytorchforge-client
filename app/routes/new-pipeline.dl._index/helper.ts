import type { SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import type { PipelineDL } from "~/types/pipelineDL";
import axios from 'axios'
import { apiServer } from "~/constants/general";
import { structurizePipelineDLFormData } from "~/helpers/structurizeData";

export const submitToServer = async (values: PipelineDL) => {
  const serverCompliantConfig = structurizePipelineDLFormData(values);
  const data = await axios.post(`${apiServer.host}/generate`, serverCompliantConfig)
  return {
    pyCode: data.data.generated_code as string
  }
}

export const onError: SubmitErrorHandler<PipelineDL> = async (errors) => {

  // make a error component and render that instead of logging in future.
  console.log(
    'Form submition errors',
    errors
  )
}

