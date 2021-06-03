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
// const handleLoginResponse = (): void => {}
const USER_KEY = 'user'
const SESSION_KEY = 'session'

const loadCurrentUser = createAsyncThunk(
  'currentUser/loadCurrentUser',
  async () => {
    const currentUserFromLocalStorage = localStorage.getItem(USER_KEY)
    if (currentUserFromLocalStorage) {
      const currentUser: CurrentUserData = JSON.parse(
        currentUserFromLocalStorage
      )
      return currentUser
    }
    return undefined
  }
)

const logInCurrentUser = createAsyncThunk(
  'currentUser/logInCurrentUser',
  async (userFormData: { [key: string]: string }, { dispatch }) => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/login_post`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userFormData),
    }).then(res => res.json())

    fetch(`${process.env.REACT_APP_SERVER_URL}/login_get`)
      .then(res => res.json())
      .then(token => {
        localStorage.setItem(SESSION_KEY, JSON.stringify(token))
        return fetch(`${process.env.REACT_APP_SERVER_URL}/user`, {
          headers: {
            token,
          },
        })
          .then(res => res.json())
          .then(data => {
            localStorage.setItem('user', JSON.stringify(data))
            dispatch(loadCurrentUser())
          })
      })
  }
)

const logOutCurrentUser = createAsyncThunk(
  'currentUser/logOutCurrentUser',
  async () => {
    localStorage.removeItem(SESSION_KEY)
    localStorage.removeItem(USER_KEY)
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
    builder.addCase(logInCurrentUser.pending, state => {
      state.loading = true
      state.success = undefined
      state.error = undefined
    })
    builder.addCase(logInCurrentUser.rejected, (state, action) => {
      state.data = currentUserInitialState
      state.loading = false
      state.success = false
      state.error = action.error.message
    })

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

    builder.addCase(logOutCurrentUser.pending, state => {
      state.loading = true
      state.success = undefined
      state.error = undefined
    })
    builder.addCase(logOutCurrentUser.fulfilled, state => {
      state.data = currentUserInitialState
      state.loading = false
      state.success = true
      state.error = undefined
    })
    builder.addCase(logOutCurrentUser.rejected, (state, action) => {
      state.data = currentUserInitialState
      state.loading = false
      state.success = false
      state.error = action.error.message
    })
  },
})

export { logInCurrentUser, loadCurrentUser, logOutCurrentUser }

export default currentUserSlice.reducer
