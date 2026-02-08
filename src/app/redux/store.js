'use client';
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import loanReducer from "./loanStore";

export const store = configureStore({
  reducer: {
    user: userReducer,
    loanData : loanReducer,
  },
});
