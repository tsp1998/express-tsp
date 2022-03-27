import { RequestHandler } from 'express'
import * as itemServices from '../services/item.services/item.services'

exports.createGetItemController = (
  ModelClass: ModelModels.ModelType,
  methodNameOrFunction?: ModelModels.MethodNameOrFunctionType,
): RequestHandler => async (req, res, next) => {
  try {
    const { itemId = '' } = req.params || {}
    if (!itemId) {
      throw new Error('No id provided...')
    }
    let item = await itemServices.getItem({
      ModelClass,
      requiredData: {},
      optionalData: {
        filter: { _id: itemId }
      },
      ...(methodNameOrFunction ? { methodNameOrFunction } : {})
    })
    if (item && (item as { toObject: Function }).toObject) {
      item = (item as { toObject: Function }).toObject({ getters: true })
    }
    res.json({ item })
  } catch (error) {
    next(error)
  }
}

exports.createCreateItemController = (
  ModelClass: ModelModels.ModelType,
  methodNameOrFunction?: ModelModels.MethodNameOrFunctionType,
): RequestHandler => async (req, res, next) => {
  try {
    const { item } = req.body || {}
    if (!item) {
      throw new Error('No item provided...')
    }
    let createdItem = await itemServices.createItem({
      ModelClass,
      requiredData: { item },
      ...(methodNameOrFunction ? { methodNameOrFunction } : {})
    })
    if (createdItem && (createdItem as { toObject: Function }).toObject) {
      createdItem = (createdItem as { toObject: Function }).toObject({ getters: true })
    }
    res.json({ createdItem })
  } catch (error) {
    next(error)
  }
}

exports.createUpdateItemController = (
  ModelClass: ModelModels.ModelType,
  methodNameOrFunction?: ModelModels.MethodNameOrFunctionType,
): RequestHandler => async (req, res, next) => {
  try {
    const { itemId = '' } = req.params || {}
    const { dataToBeUpdated } = req.body || {}
    if (!itemId || !dataToBeUpdated) {
      throw new Error('No id or data to be updated provided...')
    }
    let updatedItem = await itemServices.updateItem({
      ModelClass,
      requiredData: { itemId, dataToBeUpdated },
      ...(methodNameOrFunction ? { methodNameOrFunction } : {})
    })
    if (updatedItem && (updatedItem as { toObject: Function }).toObject) {
      updatedItem = (updatedItem as { toObject: Function }).toObject({ getters: true })
    }
    res.json({ updatedItem })
  } catch (error) {
    next(error)
  }
}

exports.createDeleteItemController = (
  ModelClass: ModelModels.ModelType,
  methodNameOrFunction?: ModelModels.MethodNameOrFunctionType,
): RequestHandler => async (req, res, next) => {
  try {
    const { itemId = '' } = req.params || {}
    if (!itemId) {
      throw new Error('No id provided...')
    }
    let deletedItem = await itemServices.deleteItem({
      ModelClass,
      requiredData: { itemId },
      ...(methodNameOrFunction ? { methodNameOrFunction } : {})
    })
    if (deletedItem && (deletedItem as { toObject: Function }).toObject) {
      deletedItem = (deletedItem as { toObject: Function }).toObject({ getters: true })
    }
    res.json({ deletedItem })
  } catch (error) {
    next(error)
  }
}