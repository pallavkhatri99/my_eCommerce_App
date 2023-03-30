import { configureStore } from '@reduxjs/toolkit'
import {activeUserReducer, productsReducer } from './counterSlice' 

export const store = configureStore({
  reducer: {
    activeUser: activeUserReducer,
    product: productsReducer,
  },
})

