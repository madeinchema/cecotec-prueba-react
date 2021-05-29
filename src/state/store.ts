import { combineReducers, configureStore } from '@reduxjs/toolkit'
import clientsReducer from './slices/clientsSlice'

const reducer = combineReducers({
  clients: clientsReducer,
})

export default configureStore({
  reducer,
})
