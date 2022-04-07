import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProductDetails = createAsyncThunk("productDetails", async (productId) => {
  return fetch(`/api/products/${productId}`)
  .then((r) => r.json())
  .then((data) => data)
})

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: {
    entities: {}
  },
  reducers: {
  },
  extraReducers: {
    [fetchProductDetails.fulfilled](state, action) {
      state.entities = action.payload 
    } 
  }
})

export const { } = productDetailsSlice.actions;
export default productDetailsSlice.reducer;