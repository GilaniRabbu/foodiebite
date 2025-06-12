import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";

import authSlice from "./slice/authSlice";
import selectedMealsSlice from "./slice/selectedMealsSlice";
// Combine all reducers
export const rootReducer = combineReducers({
  auth: authSlice,
  selectedMeals: selectedMealsSlice, // ✅ Add this line

  [baseApi.reducerPath]: baseApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
