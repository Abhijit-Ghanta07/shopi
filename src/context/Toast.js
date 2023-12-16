import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  message: "",
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    open: (state, action) => {
      state.show = true;
      state.message = action.payload;
    },
    close: (state) => {
      state.show = false;
    },
  },
});

export const { open, close } = toastSlice.actions;
export default toastSlice.reducer;
