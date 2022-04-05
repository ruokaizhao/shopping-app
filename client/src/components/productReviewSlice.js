import { createSlice } from "@reduxjs/toolkit";

const productReviewsSlice = createSlice({
  name: "productReviews",
  initialState: {
    entities: {}
  },
  reducers: {
    reviewAdded(state, action) {
      state.entities.push(action.payload)
    }
  }
})

export const { productReviewAdded } = productReviewsSlice.actions;
export default productReviewsSlice.reducer;