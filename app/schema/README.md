These fields depend on main task that is why they have separate files and schemas: 
- subtask
- dataFormat
- transformers
- pretrainedModels


## All the transformers will have a separate store 
> same will follow for customModels
- no discriminated union or any other thing.
It doesn't matter as long as the names are diff for diff mainTasks.
Our current setup will do this.
- on the page, we will present user the options to select transformers. and the list of options will be taken from pipelineDL (which has discriminated union) and will narrow the types and list as well.

- changing the order of which will only change the order in the pipelienDl store.

- for showing the default props, we will get the defaults for all the transformers and after that filter and show only of those that the user has selected

- after selection; now comes for the user to chagne the props, which we will do by changing it on the global store for all transformers

- after that when submitting the request to the api, we will send an two object: 
  - transformers array<>: this will contain the ordered list as in the pipelineDL store.
  - transformersValues object<>: this will contain the keyvalue map of the transformers in the above array, mapped to their prop-object as stored in globas pipelineDLTransformers store.