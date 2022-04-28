import { configureStore } from "@reduxjs/toolkit";
import cartsReducer from "./features/cartSlice";
import productDetailsReducer from "./features/productDetailSlice";

const store = configureStore({
  reducer: {
    carts: cartsReducer,
    productDetails: productDetailsReducer
  }
})

export default store;