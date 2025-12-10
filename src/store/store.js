import { configureStore } from '@reduxjs/toolkit'
import createSlice from '../store/sync'
import asyncSlice from "./async"
export const store = configureStore({
  reducer: {
    sync: createSlice,
    async: asyncSlice
  },
})