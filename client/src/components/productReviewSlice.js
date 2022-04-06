import { createSlice } from "@reduxjs/toolkit";

const productReviewsSlice = createSlice({
  name: "productReviews",
  initialState: {
    entities: {}
  },
  reducers: {
    productReviewAdded(state, action) {
      state.entities.push(action.payload)
    },
    productReviewRemoved(state, action) {
      
    }
  }
})

export const { productReviewAdded } = productReviewsSlice.actions;
export default productReviewsSlice.reducer;