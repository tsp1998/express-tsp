export const getItem = async (
  { ModelClass, methodNameOrFunction = 'findOne', requiredData, optionalData = {} }: ModelModels.ServiceFunctionParamsType
) => {
  const { filter = {} } = optionalData
  let item: ItemModels.ItemType
  if (typeof methodNameOrFunction === 'function') {
    item = await methodNameOrFunction(filter)
  } else {
    item = await ModelClass[methodNameOrFunction](filter)
  }
  if (!item) {
    throw new Error('No item found with this data...')
  }
  return item
}

export const createItem = async (
  { ModelClass, methodNameOrFunction = 'save', requiredData, optionalData = {} }: ModelModels.ServiceFunctionParamsType
) => {
  const { item } = requiredData
  const newItem = new ModelClass(item)
  let createdItem: ItemModels.ItemType
  if (typeof methodNameOrFunction === 'function') {
    createdItem = await methodNameOrFunction(newItem)
  } else {
    createdItem = await newItem[methodNameOrFunction]()
  }
  if (!createdItem) {
    throw new Error('Failed to create item...')
  }
  return createdItem
}

export const updateItem = async (
  { ModelClass, methodNameOrFunction = 'findByIdAndUpdate', requiredData, optionalData = {} }: ModelModels.ServiceFunctionParamsType
) => {
  const { itemId, dataToBeUpdated } = requiredData
  const { configuration = { new: true } } = optionalData
  let updatedItem: ItemModels.ItemType
  if (typeof methodNameOrFunction === 'function') {
    updatedItem = await methodNameOrFunction(itemId, dataToBeUpdated, configuration)
  } else {
    updatedItem = await ModelClass[methodNameOrFunction](
      itemId, dataToBeUpdated, configuration
    )
  }
  if (!updatedItem) {
    throw new Error('Item not updated...')
  }
  return updatedItem
}

export const deleteItem = async (
  { ModelClass, methodNameOrFunction = 'findByIdAndDelete', requiredData, optionalData = {} }: ModelModels.ServiceFunctionParamsType
) => {
  const { itemId } = requiredData
  let deletedItem: ItemModels.ItemType
  if (typeof methodNameOrFunction === 'function') {
    deletedItem = await methodNameOrFunction(itemId)
  } else {
    deletedItem = await ModelClass[methodNameOrFunction](itemId)
  }
  if (!deletedItem) {
    throw new Error('Item not deleted...')
  }
  return deletedItem
}