import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  message: "",
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    ToastOpen: (state, action) => {
      state.show = true;
      state.message = action.payload;
    },
    ToastClose: (state) => {
      state.show = false;
    },
  },
});

export const { ToastOpen, ToastClose } = toastSlice.actions;
export default toastSlice.reducer;
