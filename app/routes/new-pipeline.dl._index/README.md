# Discussing the steps involved
Serial number is the page > in bracket, there is name for that page.  
see page names in `~/constants/pipelineDL` -> `pageSlugToLabel`

// First page [task]
1. Main Task selection
  - Dropdown
1. Sub Task selection
  - Dropdown
1. DataFormat selection
  - Dropdown
1. DataFormatPicker 
  - File / Folder picker which after selection will show the file and folder path.

// Data pre processing [preProcessing]
2. Transformers list
  - [v1] search
  - [v2] unitsBucket (with drag)

// Model Selection [model]
3. Tab1. Pretrained models 
  - [v1] search
  - [v2] unitsBucket (with drag)
3. Tab2. Custom models
  - [v1] search
  - [v2] unitsBucket (with drag)


// Training Page [training]
Section1. Training Options
4. Tab1. Losses
  - [v1] search
  - [v1] unitsBucket
4. Tab2. Optimizers
  - [v1] search
  - [v1] unitsBucket
4. Tab3. Monitoring
  - Multiple checkboxes
4. Tab4. Metrics
  - [v1] search
  - [v1] unitsBucket
Section2. Training Configuration 
4. input group for trainingHyperParameters
4. earlyStopping
  - UI input ~usual with default values
4. lRSchedular
  - [v1] search
  - [v1] unitsBucket


// Summary page [summary]
5. Config Summary
  - just summarize the fields 
  - Generate Code
    - Modal: Copy Code / Download / Run






# For search fields, there are two major types;
1. [v1] user will search and stuff will come in lines
-> Search part (add-btn to add. it in. Show part)
--------somethinig-------add-btn-
--------somethinig-------add-btn-
--------somethinig-------add-btn-
--------somethinig-------add-btn-

-> unitsBucket (gear to change props)
--------somethinig-------gear--
--------somethinig-------gear--
--------somethinig-------gear--
--------somethinig-------gear--

2. [v2] user should be able to (drag) in show part
-> Search part // will be same as 1.
-> unitsBucket
--drag------somethinig-------gear--
--drag------somethinig-------gear--
--drag------somethinig-------gear--
--drag------somethinig-------gear--

## API of these
>> Consumer side
```tsx
const [selectedItems, setSelectedItems] = useState(null);
const [itemsAdded, setItemsAdded] = useState([]);

const handleOnAdd = useCallback((newItem) => {
  setItemsLeft((prev) => (
    prev.filter(i => i !== newItem)
  ))
  setItemsAdded((prev) => (
    [...prev, newItem]
  ))
}, [itemsAdded])

<Search
  options={defaultItems}
  isMultiioio
  handleOnAdd={handleOnAdd}
/>

// [v1]
<div>
{selectedItems.map(itemName => (
  <UnitsBucket 
    isDraggable={true}
    handleRemove={will remove from list and state also}
    handleReset={will reset the prop values in state}
    showGear={true}

    // will only be *rendered* if showGear is true
    propsUpdateUI={item2UpdateUI[itemName]} // this wil do handlePropUpdate
  />
))}
</div>

// [v2]
<DragBucket 

/>

```