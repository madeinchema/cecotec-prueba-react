import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ClientPublicData } from '../../types'
import { getClientsFromApi } from '../../utils/functions/getClientsFromApi'

/**
 * State
 */
export type ClientsSliceState = {
  data: ClientPublicData[]
  loading: boolean
  success: boolean | undefined
  error: string | undefined
}

const initialState: ClientsSliceState = {
  data: [],
  loading: false,
  success: false,
  error: undefined,
}

/**
 * Thunks
 */
const getClients = createAsyncThunk('clients/getClients', async () => {
  const response = await getClientsFromApi()
  return response
})

/**
 * Slice
 */
export const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getClients.pending, state => {
      state.loading = true
      state.success = undefined
      state.error = undefined
    })

    builder.addCase(getClients.fulfilled, (state, action) => {
      state.data = action.payload
      state.loading = false
      state.success = true
      state.error = undefined
    })

    builder.addCase(getClients.rejected, (state, action) => {
      state.data = []
      state.loading = false
      state.success = false
      state.error = action.error.message
    })
  },
})

export { getClients }

export default clientsSlice.reducer
