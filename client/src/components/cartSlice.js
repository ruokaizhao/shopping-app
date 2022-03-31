import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCarts = createAsyncThunk("carts/fetchCarts", () => {
  return fetch("/api/carts")
  .then((r) => r.json())
  .then((data) => data)
})

const cartsSlice = createSlice({
  name: "carts",
  initialState: {
    entities: []
  },
  reducers: {
    cartAdded(state, action) {
      state.entities.push(action.payload)
    },
    cartRemoved(state, action) {
      const index = state.entities.findIndex((product) => product.id === action.payload)
      state.entities.splice(index, 1)
    },
    cartUpdated(state, action) {
      const item = state.entities.find((product) => product.id === action.payload.id)
      item.quantity = action.payload.quantity
    }
  },
  extraReducers: {
    [fetchCarts.fulfilled](state, action) {
      state.entities = action.payload
    }
  }
})

export const { cartAdded, cartRemoved, cartUpdated } = cartsSlice.actions;
export default cartsSlice.reducer;