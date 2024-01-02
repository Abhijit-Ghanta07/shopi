import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || {},
    userId: localStorage.getItem("userid") || "",
  },
  reducers: {
    addUser: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("userid", action.payload.userId);
      state.user = { ...action.payload.user };
      state.userId = action.payload.userId;
    },
    removeuser: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("userid");
      state.user = {};
      state.userId = "";
    },
  },
});

export const { addUser, removeuser } = authSlice.actions;
export default authSlice.reducer;
