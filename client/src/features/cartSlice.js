import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// The return value of createAsyncThunk will be the action.payload in the corresponding reducers in the extraReducers.
export const fetchCarts = createAsyncThunk("carts/fetchCarts", async (userId) => {
  return fetch(`/api/users/${userId}/carts`)
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
    },
    cartCleared(state, action) {
      state.entities = []
    }
  },
  extraReducers: {
    [fetchCarts.fulfilled](state, action) {
      state.entities = action.payload
    }
  }
})

export const { cartAdded, cartRemoved, cartUpdated, cartCleared } = cartsSlice.actions;
export default cartsSlice.reducer;