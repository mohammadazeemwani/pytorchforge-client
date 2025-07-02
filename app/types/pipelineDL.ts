import * as z from 'zod/v4'
import { pipelineDLSchema } from "~/schema/pipelineDL";
export type PipelineDL = z.infer<typeof pipelineDLSchema>


export type MainTask = PipelineDL['mainTask']
export type SubTasks = PipelineDL['subTask']
export type DataFormat = PipelineDL['dataFormat']
export type Transformers = PipelineDL['transformers']
export type TransformersProps = {
  image: z.infer<typeof imageTransformersSchema>,
  text: z.infer<typeof textTransformersSchema>,
  audio: z.infer<typeof audioTransformersSchema>,
}
export type PreTrainedModels = PipelineDL['pretrainedModels']
export type CustomModels = PipelineDL['customModels']
export type Losses = PipelineDL['losses']
export type Optimizers = PipelineDL['optimizers']
export type Monitoring = PipelineDL['monitoring']
export type Metrics = PipelineDL['metrics']
export type EarlyStopping = PipelineDL['earlyStopping']
export type LRSchedular = PipelineDL['lrSchedular']

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
  addCustomModel: (customModel: keyof CustomModels) => void;
  /**
   * - Updating values for params of a custom model
   */
  updateCustomModel: 
  <
    M extends keyof CustomModels,
    PropName extends keyof CustomModels[M]
  >(
    customModel: M,
    prop: PropName,
    value: CustomModels[M][PropName]
  ) => void
  /**
   * description will remove the model from the state.
   */
  removeCustomModel: (customModel: keyof CustomModels) => void;
  /**
   * description: It will reset the props of given model to the default / initial
   */
  resetCustomModel: (customModel: keyof CustomModels) => void;


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
  addMonitoring: (monitoring: Monitoring) => void;
  /**
   * @description removes the given monitor from the state  
   */
  removeMonitoring: (monitoring: Monitoring) => void;
  /**
   * @description: resets the params of given monitor (if found in state)
   */
  resetMonitoring: (monitoring: keyof Metrics) => void;


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
   * @description will reset the given prop of EarlyStopping to the default / initial value
   */
  resetEarlyStopping: (prop: keyof EarlyStopping) => void


  //--------------------------------- LR_SCHEDULAR ---------------------------------------
  /**
   * @description will add the given lrSchedular to the state with default / initial values.
   */
  addLrSchedular: (option: keyof LRSchedular) => void;
  /**
   * @description will update the prop of given lrSchedular with corresponding given value.
   */
  updateLrSchedular: 
  <
    Option extends keyof LRSchedular,
    PropName extends keyof LRSchedular[Option]
  >(
    option: Option,
    prop: PropName,
    value: LRSchedular[Option][PropName]
  ) => void
  /**
   * @description removes the given lrSchedular from the state  
   */
  removeLrSchedular: (option: keyof LRSchedular) => void;
  /**
   * @description: resets the params of given lrSchedular (if found in state)
   */
  resetLrSchedular: (option: keyof LRSchedular) => void;
}


