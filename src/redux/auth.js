import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    loadFinish: false,
    currentUser: false,
    user: JSON.parse(localStorage.getItem("user")) || {},
    userId: localStorage.getItem("userid") || "",
  },
  reducers: {
    addUser: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("userid", action.payload.userId);
      state.loading = false;
      state.loadFinish = true;
      state.currentUser = true;
      state.user = { ...action.payload.user };
      state.userId = action.payload.userId;
    },
    removeuser: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("userid");
      state.loading = false;
      state.loadFinish = false;
      state.currentUser = false;
      state.user = {};
      state.userId = "";
    },
    setloading: (state) => {
      state.loading = true;
      state.loadFinish = false;
    },
    loadfinish: (state) => {
      state.loading = false;
      state.loadFinish = true;
    },
  },
});

export const { addUser, removeuser, setloading, loadfinish } =
  authSlice.actions;
export default authSlice.reducer;
