import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthData {
  email: string
}

interface AuthState {
  user: AuthData | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true
      state.error = null
    },
    loginSuccess(state) {
      state.loading = false
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.error = action.payload
      state.loading = false
    },
    logout(state) {
      state.user = null
    },
    resetError(state) {
      state.error = null
    },
  },
})

export const { loginStart, loginSuccess, loginFailure, logout, resetError } =
  authSlice.actions

export const authReducer = authSlice.reducer
