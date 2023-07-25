import { configureStore } from "@reduxjs/toolkit";
import { orderReducer } from "./OrderSlice";

const store = configureStore({
  reducer: {
    // Reducers
    orders: orderReducer,
  },
});

export default store;
