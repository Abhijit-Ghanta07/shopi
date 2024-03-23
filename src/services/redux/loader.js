import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loader",
  initialState: false,

  reducers: {
    loaderOpen: (state, action) => (state = true),
    loaderClose: (state, action) => (state = false),
  },
});

export const { loaderOpen, loaderClose } = loaderSlice.actions;

export default loaderSlice.reducer;
