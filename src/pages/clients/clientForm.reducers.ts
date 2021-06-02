import { Reducer } from 'react'

interface InputClientData {
  name: string
  price: string
}

type ClientFormReducerState = InputClientData
type ClientFormReducerAction =
  | {
      type: 'name' | 'price'
      payload: string
    }
  | { type: 'form'; payload: InputClientData }

const initialClientFormState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
}

const clientFormReducer: Reducer<
  ClientFormReducerState,
  ClientFormReducerAction
> = (state, action): InputClientData => {
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

export { clientFormReducer, initialClientFormState }
