import * as z from 'zod/v4'
import { pipelineDLSchema } from "~/schema/pipelineDL";
export type PipelineDL = z.infer<typeof pipelineDLSchema>


export type MainTask = PipelineDL['mainTask']
export type SubTasks = PipelineDL['subTask']
export type SubTasksDiscriminated<T extends MainTask> = 
  Extract<PipelineDL, { mainTask: T}>['subTask']
export type DataFormat = PipelineDL['dataFormat']
export type DataFormatPicker = PipelineDL['dataFile']
export type Transformers = PipelineDL['transformers']
export type UnifiedTransformers = Transformers extends (infer ItemType)[] ? ItemType : never;


export type PreTrainedModels = PipelineDL['pretrainedModel']
export type CustomModels = PipelineDL['customModels'][number]
export type Loss = PipelineDL['loss']
export type Optimizer = PipelineDL['optimizer']
export type Metrics = PipelineDL['metrics']
export type LRSchedular = PipelineDL['lrSchedular']
export type Monitoring = PipelineDL['monitoring']
export type EarlyStopping = PipelineDL['earlyStopping']