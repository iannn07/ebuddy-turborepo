import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slices/authSlices'
import { updateUserReducer } from './slices/updateUserSlices'

const store = configureStore({
  reducer: {
    auth: authReducer,
    updateUser: updateUserReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
