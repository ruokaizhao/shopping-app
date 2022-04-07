import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProductDetails = createAsyncThunk("productDetails/fetchProductDetails", async (productId) => {
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
    reviewAdded(state, action) {
      state.entities.reviews.push(action.payload)
    },
    reviewRemoved(state, action) {
      const index = state.entities.reviews.findIndex((review) => review.id === action.payload)
      state.entities.reviews.splice(index, 1)
    },
    reviewUpdated(state, action) {
      const review = state.entities.reviews.find((item) => item.id === action.payload.id)
      review.content = action.payload.content
      review.rating = action.payload.rating
    }
  },
  extraReducers: {
    [fetchProductDetails.fulfilled](state, action) {
      state.entities = action.payload 
    } 
  }
})

export const { reviewAdded, reviewRemoved, reviewUpdated } = productDetailsSlice.actions;
export default productDetailsSlice.reducer;