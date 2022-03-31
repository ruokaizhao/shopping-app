import { configureStore } from "@reduxjs/toolkit";
import cartsReducer from "./components/cartSlice";

const store = configureStore({
  reducer: {
    carts: cartsReducer
  }
})

export default store;