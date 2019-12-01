import Dispatcher from '../Dispatcher'

export const addProduct = (product) => {
  Dispatcher.dispatch({
    type: 'ADD_PRODUCT',
    product
  })  
}

export const deleteProduct = (proName) => {
  Dispatcher.dispatch({
    type: 'DELETE_PRODUCT',
    proName
  })
}