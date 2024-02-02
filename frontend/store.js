import { configureStore } from '@reduxjs/toolkit';
import authReducer from './src/slices/authSlice';
import { apiSlice } from './src/slices/apiSlices';

const store = configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
    //   cart: cartSliceReducer,
      auth: authReducer, 
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
  });
  
  export default store;