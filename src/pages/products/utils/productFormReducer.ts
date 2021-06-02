import { Reducer } from 'react'

interface ProductFormInput {
  value: string
  isValid?: boolean | undefined
  error?: string | undefined
  fieldValidationInfo?: string
}

export interface ProductFormReducerState {
  name: ProductFormInput
  price: ProductFormInput
}

type ProductFormInputName = 'name' | 'price'

export type ProductFormInputValue = {
  [key in ProductFormInputName]: {
    value: string
  }
}

type ProductFormReducerAction =
  | {
      type: ProductFormInputName
      payload: string
    }
  | { type: 'form'; payload: ProductFormReducerState }

const initialProductFormState = {
  name: {
    value: '',
    isValid: undefined,
    error: undefined,
    fieldValidationInfo: '',
  },
  price: {
    value: '',
    isValid: undefined,
    error: undefined,
    fieldValidationInfo: '',
  },
}

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
      if (action.payload.length >= 9) return state
      return {
        ...state,
        price: {
          ...state.price,
          value: action.payload,
        },
      }
    }
    default:
      return state
  }
}

export { productFormReducer, initialProductFormState }
