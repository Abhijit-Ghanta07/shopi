import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "../api/Api";

// Async thunk to fetch product data
export const fetchProductData = createAsyncThunk(
  "product/fetchProductData",
  async () => {
    // Perform asynchronous operation to fetch product data (replace with your logic)
    try {
      const response = await fetchData("products");
      return response;
    } catch (err) {
      return err;
    }
  }
);

// Initial state
const initialState = {
  productData: null,
  loading: false,
  error: null,
};

// Create slice
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.productData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductData.fulfilled, (state, action) => {
        state.loading = false;
        state.productData = action.payload;
      })
      .addCase(fetchProductData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setProduct } = productSlice.actions;
export default productSlice.reducer;
