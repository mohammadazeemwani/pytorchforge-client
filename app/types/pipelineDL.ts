import type { UseFormReturn } from 'react-hook-form';
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
export type CustomModels = PipelineDL['customModels']
export type Losses = PipelineDL['losses']
export type Optimizers = PipelineDL['optimizers']
export type Monitoring = PipelineDL['monitoring']
export type Metrics = PipelineDL['metrics']
export type EarlyStopping = PipelineDL['earlyStopping']
export type LRSchedular = PipelineDL['lrSchedular']

/**
 * It is highly recommended to all the isGoodToGo functions to use unified parser to parse error strings.  
 * So they look consistent.
 */

export type PipelineDL_StoreAction = {
  /** 
   * @description This will SET the mainTask
   * This will clear all the other fields to default OR Initial state
   */
  setTask: (mainTask: MainTask) => void;
  /** 
   * @description This will SET the subTask
   * This will clear all the other fields to default OR Initial, below the heirarchy
   */
  setSubTask: (subTask: SubTasks) => void;
  /** 
   * @description This will SET the dataFormat
   * This will clear all the other fields to default OR Initial, below the heirarchy
   */
  setDataFormat: (dataFormat: DataFormat) => void;


  /**
   * @description This will set the data format picker.
   */
  setDataFormatPicker: (data: DataFormatPicker) => void;
  //--------------------------------- TRANSFORMERS ---------------------------------------
  /**
   * @description This will add an array of transformers
   * - as they need to be in order, so that is why we are accepting in bulk stuff.
   */
  setTransformers: (transformers: Transformers) => void;


  //--------------------------------- PRE_TRAINED MODELS ---------------------------------------
  /** 
   * @description same as adding transformers
   * - add with default values
   * - NOTE: We are using mainTask as an option actuall for type-checking.
  */
  setPretrainedModels: (pretrainedModels: PreTrainedModels) => void;

  //--------------------------------- CUSTOM MODELS ---------------------------------------
  /**
   * - Adding will add the model with default params at start
   * - It doesn't depends on maintask 
   */
  setCustomModels: (customModel: CustomModels) => void;

  //--------------------------------- LOSSES ---------------------------------------
  /**
   * @description will add the given loss to the state with default / initial values.
   */
  addLoss: (loss: keyof Losses) => void;
  /**
   * @description will update the prop of given loss with corresponding given value.
   */
  updateLoss: 
  <
    L extends keyof Losses,
    PropName extends keyof Losses[L]
  >(
    loss: L,
    prop: PropName,
    value: Losses[L][PropName]
  ) => void
  /**
   * @description removes the given loss from the state  
   */
  removeLoss: (loss: keyof Losses) => void;
  /**
   * @description: resets the params of given loss (if found in state)
   */
  resetLoss: (loss: keyof Losses) => void;


  
  //--------------------------------- OPTIMIZERS ---------------------------------------
  /**
   * @description will add the given optimizer to the state with default / initial values.
   */
  addOptimizer: (optimizer: keyof Optimizers) => void;
  /**
   * @description will update the prop of given optimizer with corresponding given value.
   */
  updateOptimizer: 
  <
    O extends keyof Optimizers,
    PropName extends keyof Optimizers[O]
  >(
    optimizer: O,
    prop: PropName,
    value: Optimizers[O][PropName]
  ) => void
  /**
   * @description removes the given optimizer from the state  
   */
  removeOptimizer: (optimizer: keyof Optimizers) => void;
  /**
   * @description: resets the params of given optimizer (if found in state)
   */
  resetOptimizer: (optimizer: keyof Optimizers) => void;



  //--------------------------------- MONITORING ---------------------------------------
  /**
   * @description we will add the given monitor to the state.
   * - these are just values
   */
  addMonitoring: (monitoring: Monitoring[number]) => void;
  /**
   * @description removes the given monitor from the state  
   */
  removeMonitoring: (monitoring: Monitoring[number]) => void;
  /**
   * @description: resets the params of given monitor (if found in state)
   */
  resetMonitoring: (monitoring: Monitoring[number]) => void;


  //--------------------------------- METRICS ---------------------------------------
  /**
   * @description will add the given metrics to the state with default / initial values.
   */
  addMetric: (metric: keyof Metrics) => void;
  /**
   * @description will update the prop of given metrics with corresponding given value.
   */
  updateMetric: 
  <
    M extends keyof Metrics,
    PropName extends keyof Metrics[M]
  >(
    metric: M,
    prop: PropName,
    value: Metrics[M][PropName]
  ) => void
  /**
   * @description removes the given metrics from the state  
   */
  removeMetric: (metric: keyof Metrics) => void;
  /**
   * @description: resets the params of given metrics (if found in state)
   */
  resetMetric: (metric: keyof Metrics) => void;



  //--------------------------------- EARLY_STOPPING ---------------------------------------
  /**
   * @description 
   *  - will update the given prop of the EarlyStopping-object of the pipeline state
   * - updateEarlyStopping means to update props of it..
   */
  updateEarlyStopping: <P extends keyof EarlyStopping>(prop: P, value: EarlyStopping[P]) => void;
  /**
   * @description will reset the EarlyStopping object fully to the default / initial object
   */
  resetEarlyStopping: () => void


  //--------------------------------- LR_SCHEDULAR ---------------------------------------
  /**
   * @description will add the given lrSchedular to the state with default / initial values.
   */
  addLrSchedular: (schedular: keyof LRSchedular) => void;
  /**
   * @description will update the prop of given lrSchedular with corresponding given value.
   */
  updateLrSchedular: 
  <
    Schedular extends keyof LRSchedular,
    PropName extends keyof LRSchedular[Schedular]
  >(
    schedular: Schedular,
    prop: PropName,
    value: LRSchedular[Schedular][PropName]
  ) => void
  /**
   * @description removes the given lrSchedular from the state  
   */
  removeLrSchedular: (schedular: keyof LRSchedular) => void;
  /**
   * @description: resets the params of given lrSchedular (if found in state)
   */
  resetLrSchedular: (schedular: keyof LRSchedular) => void;
}


