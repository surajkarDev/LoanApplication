'use client';
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loginInformation: {},
    isLoggedIn: false,
    dashboardActiveLinks:null
  },
  reducers: {
    login: (state, action) => {
      state.loginInformation = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.loginInformation = {};
      state.isLoggedIn = false;
    },
    dashboardActive(state,action){
      state.dashboardActiveLinks = action.payload
    }
  },
});

export const { login, logout,dashboardActive } = userSlice.actions;
export default userSlice.reducer;
