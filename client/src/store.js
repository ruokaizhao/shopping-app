import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./components/cartSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer
  }
})

export default store;