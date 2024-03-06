import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, userInfo } = action.payload;
      state.token = accessToken;
      state.userInfo = userInfo;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    },
    logOut: (state, action) => {
      state.token = null;
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
export const selectUserInfo = (state) => state.auth.userInfo;
