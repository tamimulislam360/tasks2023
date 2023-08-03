import { configureStore } from '@reduxjs/toolkit';
import { taskApi } from './api';
import filterReducer from './features/filterSlice';


export const store = configureStore({
  reducer: {
    [taskApi.reducerPath]: taskApi.reducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(taskApi.middleware),
});
