import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { userSlice } from "./slices/user";

const rootReducer = combineReducers({
  users: userSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});