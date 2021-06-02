import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/**
 * Types
 */
type CurrentUserData =
  | {
      id: number
      firstName: string
      lastName: string
      email: string
      avatar: string
    }
  | undefined

/**
 * State
 */
export type ClientsSliceState = {
  data: CurrentUserData
  loading: boolean
  success: boolean | undefined
  error: string | undefined
}

const currentUserInitialState = undefined

const initialState: ClientsSliceState = {
  data: currentUserInitialState,
  loading: false,
  success: false,
  error: undefined,
}

/**
 * Thunks
 */
const loadCurrentUser = createAsyncThunk(
  'currentUser/loadCurrentUser',
  async () => {
    const USER_KEY = 'user'
    const currentUser: CurrentUserData = JSON.parse(
      localStorage.getItem(USER_KEY) || '{}'
    ) as CurrentUserData
    return currentUser
  }
)

/**
 * Slice
 */
export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadCurrentUser.pending, state => {
      state.loading = true
      state.success = undefined
      state.error = undefined
    })
    builder.addCase(loadCurrentUser.fulfilled, (state, action) => {
      state.data = action.payload
      state.loading = false
      state.success = true
      state.error = undefined
    })
    builder.addCase(loadCurrentUser.rejected, (state, action) => {
      state.data = currentUserInitialState
      state.loading = false
      state.success = false
      state.error = action.error.message
    })
  },
})

export { loadCurrentUser }

export default currentUserSlice.reducer
