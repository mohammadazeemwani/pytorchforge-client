import type { SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import type { PipelineDL } from "~/types/pipelineDL";
import axios from 'axios'
import { apiServer } from "~/constants/general";
import { structurizePipelineDLFormData } from "~/helpers/structurizeData";

export const onSubmit: SubmitHandler<PipelineDL> = async (values) => {
  console.log(
    'Form submitted and validated values are',
    values
  );
  const serverCompliantConfig = structurizePipelineDLFormData(values);
  const data = await axios.post(`${apiServer.host}/generate`, serverCompliantConfig)

  console.log(data)
}

export const onError: SubmitErrorHandler<PipelineDL> = async (errors) => {

  // make a error component and render that instead of logging in future.
  console.log(
    'Form submition errors',
    errors
  )
}

