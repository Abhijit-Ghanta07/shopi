import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchData from "../api/api";

export const fetchCategory = createAsyncThunk(
  "category/getcategory",
  async () => {
    try {
      let data = await fetchData("categories");
      return data;
    } catch (err) {
      return err;
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      return [...action.payload];
    });
  },
});

export default categorySlice.reducer;
