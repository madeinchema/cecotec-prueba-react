import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { internet, image } from 'faker'
import { ClientData, ClientPublicData, EditableClientData } from '../../types'
import {
  addClientToApi,
  editClientFromApi,
  getClientFromApi,
  getClientsFromApi,
  removeClientFromApi,
} from '../../api/clients'

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

const addClient = createAsyncThunk(
  'clients/addClient',
  async (clientData: EditableClientData) => {
    const newClient = {
      ...clientData,
      password: internet.password(),
      avatar: image.avatar(),
    } as ClientData

    return addClientToApi(newClient)
      .then(() => {
        return getClientsFromApi()
      })
      .catch(err => {
        throw new Error(err)
      })
  }
)

type EditClient = {
  clientId: string
  clientDataToUpdate: EditableClientData
}
const editClient = createAsyncThunk(
  'clients/removeClient',
  async ({ clientId, clientDataToUpdate }: EditClient) => {
    const clientData = await getClientFromApi(clientId)

    const updatedClientData = {
      ...clientData,
      ...clientDataToUpdate,
    } as ClientData

    return editClientFromApi(updatedClientData)
      .then(() => {
        return getClientsFromApi()
      })
      .catch(err => {
        throw new Error(err)
      })
  }
)

const removeClient = createAsyncThunk(
  'clients/removeClient',
  async (clientId: string) => {
    return removeClientFromApi(clientId)
      .then(() => {
        return getClientsFromApi()
      })
      .catch(err => {
        throw new Error(err)
      })
  }
)

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

    builder.addCase(addClient.pending, state => {
      state.loading = true
      state.success = undefined
      state.error = undefined
    })
    builder.addCase(addClient.fulfilled, (state, action) => {
      state.data = action.payload
      state.loading = false
      state.success = true
      state.error = undefined
    })
    builder.addCase(addClient.rejected, (state, action) => {
      state.data = []
      state.loading = false
      state.success = false
      state.error = action.error.message
    })

    builder.addCase(removeClient.pending, state => {
      state.loading = true
      state.success = undefined
      state.error = undefined
    })
    builder.addCase(removeClient.fulfilled, (state, action) => {
      state.data = action.payload
      state.loading = false
      state.success = true
      state.error = undefined
    })
    builder.addCase(removeClient.rejected, (state, action) => {
      state.data = []
      state.loading = false
      state.success = false
      state.error = action.error.message
    })
  },
})

export { getClients, addClient, editClient, removeClient }

export default clientsSlice.reducer
