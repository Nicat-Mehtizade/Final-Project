import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { activityApi } from '../services/activity'

export const store = configureStore({
  reducer: {
    [activityApi.reducerPath]: activityApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(activityApi.middleware),
})


setupListeners(store.dispatch)