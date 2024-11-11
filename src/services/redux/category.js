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
let initialState = { categories: [], pending: false, error: null };
const categorySlice = createSlice({
  name: "category",
  initialState: { ...initialState },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.fulfilled, (state, action) => {
        return { categories: [...action.payload], error: null, pending: false };
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.error = action.error;
      });
  },
});

export default categorySlice.reducer;
