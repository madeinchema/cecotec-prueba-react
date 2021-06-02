import { Reducer } from 'react'

/**
 * Types
 */
interface ProductFormInput {
  value: string
  isValid?: boolean | undefined
  error?: string | undefined
}

export interface ProductFormReducerState {
  name: ProductFormInput
  price: ProductFormInput
}

type ProductFormInputName = 'name' | 'price'

export type ProductFormInputValue = {
  [key in ProductFormInputName]: {
    value: string
    isValid?: boolean
  }
}

type ProductFormReducerAction =
  | {
      type: ProductFormInputName
      payload: string
    }
  | { type: 'form'; payload: ProductFormReducerState }

/**
 * Initial state
 */
const initialProductFormState = {
  name: {
    value: '',
    isValid: undefined,
    error: undefined,
  },
  price: {
    value: '',
    isValid: undefined,
    error: undefined,
  },
}

/**
 * productFormReducer
 */
const productFormReducer: Reducer<
  ProductFormReducerState,
  ProductFormReducerAction
> = (state, action): ProductFormReducerState => {
  switch (action.type) {
    case 'form':
      return action.payload
    case 'name':
      return {
        ...state,
        name: {
          ...state.name,
          value: action.payload,
        },
      }
    case 'price': {
      let newPrice = action.payload
      // RegExp: Empty || Number with only 1 comma & up to 2 decimals
      const numberRegex = new RegExp(/^$|^\d+(,\d{0,2})?$/g)
      const isValidInput = numberRegex.test(newPrice)
      if (!isValidInput || newPrice.length >= 9) newPrice = state.price.value
      if (newPrice.length === 0) newPrice = ''

      return {
        ...state,
        price: {
          ...state.price,
          isValid: isValidInput,
          value: newPrice,
        },
      }
    }
    default:
      return state
  }
}

export { productFormReducer, initialProductFormState }
