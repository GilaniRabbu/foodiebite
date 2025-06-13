/* eslint-disable */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TSelectedMealsState = {
  selectedMeals: any[];
};

const initialState: TSelectedMealsState = {
  selectedMeals: [],
};

const selectedMealsSlice = createSlice({
  name: "selectedMeals",
  initialState,
  reducers: {
    setSelectedMeals: (state, action: PayloadAction<any[]>) => {
      state.selectedMeals = action.payload;
    },
    addMeal: (state, action: PayloadAction<any>) => {
      const exists = state.selectedMeals.find(
        (meal) => meal._id === action.payload._id
      );
      if (!exists) {
        state.selectedMeals.push(action.payload);
      }
    },
    removeMeal: (state, action: PayloadAction<string>) => {
      state.selectedMeals = state.selectedMeals.filter(
        (meal) => meal._id !== action.payload
      );
    },
    clearSelectedMeals: (state) => {
      state.selectedMeals = [];
    },
  },
});

export const { setSelectedMeals, addMeal, removeMeal, clearSelectedMeals } =
  selectedMealsSlice.actions;

export default selectedMealsSlice.reducer;

// ✅ Selector
export const selectSelectedMeals = (state: {
  selectedMeals: TSelectedMealsState;
}) => state.selectedMeals.selectedMeals;
