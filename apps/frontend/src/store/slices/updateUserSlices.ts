import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UpdateUserState {
  loading: boolean
  error: string | null
}

const initialState: UpdateUserState = {
  loading: false,
  error: null,
}

const updateUserSlice = createSlice({
  name: 'updateUser',
  initialState,
  reducers: {
    updateUserStart: (state) => {
      state.loading = true
      state.error = null
    },
    updateUserSuccess: (state) => {
      state.loading = false
      state.error = null
    },
    updateUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    resetUpdateState: (state) => {
      state.loading = false
      state.error = null
    },
  },
})

export const {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  resetUpdateState,
} = updateUserSlice.actions

export const updateUserReducer = updateUserSlice.reducer
