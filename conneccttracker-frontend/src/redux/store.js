import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/auth/authSlice";
import connectReducer from "../Features/connects/connectSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    connects: connectReducer,
  },
});

export default store;
