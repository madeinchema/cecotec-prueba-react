import { Reducer } from 'react'

interface InputProductData {
  name: string
  price: string
}

type FormReducerState = InputProductData
type FormReducerAction =
  | {
      type: 'name' | 'price'
      payload: string
    }
  | { type: 'form'; payload: InputProductData }

const initialFormState = {
  name: '',
  price: '',
}

const formReducer: Reducer<FormReducerState, FormReducerAction> = (
  state,
  action
): InputProductData => {
  switch (action.type) {
    case 'form':
      return action.payload
    case 'name':
      return { ...state, name: action.payload }
    case 'price':
      return { ...state, price: action.payload }
    default:
      return state
  }
}

export { formReducer, initialFormState }
