import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    entities: []
  },
  reducers: {
    itemAdded(state, action) {
      state.entities.push(action.payload)
    },
    itemRemoved(state, action) {
      const index = state.entities.findIndex((product) => product.id === action.payload)
      state.entities.splice(index, 1)
    }
  }
})

export const { itemAdded, itemRemoved } = cartSlice.actions;
export default cartSlice.reducer;