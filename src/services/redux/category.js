import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchData from "../api/api";

export const fetchCategory = createAsyncThunk(
  "category/getcategory",
  async () => {
    let data = await fetchData("categories");
    return data;
  }
);
let initialState = { categories: [], pending: false, error: null };
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.categories = [...action.payload];
        return state;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.error = action.error;
        return state;
      });
  },
});

export default categorySlice.reducer;
