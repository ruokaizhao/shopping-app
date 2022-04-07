import { configureStore } from "@reduxjs/toolkit";
import cartsReducer from "./components/cartSlice";
import productDetailsReducer from "./components/productDetailSlice";

const store = configureStore({
  reducer: {
    carts: cartsReducer,
    productDetails: productDetailsReducer
  }
})

export default store;