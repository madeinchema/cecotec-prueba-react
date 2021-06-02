import { Reducer } from 'react'

interface InputProductData {
  name: string
  price: string
}

type ProductFormReducerState = InputProductData
type ProductFormReducerAction =
  | {
      type: 'name' | 'price'
      payload: string
    }
  | { type: 'form'; payload: InputProductData }

const initialProductFormState = {
  name: '',
  price: '',
}

const productFormReducer: Reducer<
  ProductFormReducerState,
  ProductFormReducerAction
> = (state, action): InputProductData => {
  switch (action.type) {
    case 'form':
      return action.payload
    case 'name':
      return { ...state, name: action.payload }
    case 'price': {
      if (action.payload.length >= 9) return state
      return { ...state, price: action.payload }
    }
    default:
      return state
  }
}

export { productFormReducer, initialProductFormState }
