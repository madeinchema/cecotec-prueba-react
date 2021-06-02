import { combineReducers, configureStore } from '@reduxjs/toolkit'
import clientsReducer from './slices/clientsSlice'
import currentUserReducer from './slices/currentUserSlice'

const reducer = combineReducers({
  clients: clientsReducer,
  currentUser: currentUserReducer,
})

export default configureStore({
  reducer,
})
