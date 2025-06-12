/* eslint-disable */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TSelectedMealsState = {
  selectedMeals: string[];
};

const initialState: TSelectedMealsState = {
  selectedMeals: [],
};

const selectedMealsSlice = createSlice({
  name: "selectedMeals",
  initialState,
  reducers: {
    setSelectedMeals: (state, action: PayloadAction<string[]>) => {
      state.selectedMeals = action.payload;
    },
    addMeal: (state, action: PayloadAction<string>) => {
      if (!state.selectedMeals.includes(action.payload)) {
        state.selectedMeals.push(action.payload);
      }
    },
    removeMeal: (state, action: PayloadAction<string>) => {
      state.selectedMeals = state.selectedMeals.filter(
        (mealId) => mealId !== action.payload
      );
    },
    clearSelectedMeals: (state) => {
      state.selectedMeals = [];
    },
  },
});

export const {
  setSelectedMeals,
  addMeal,
  removeMeal,
  clearSelectedMeals,
} = selectedMealsSlice.actions;

export default selectedMealsSlice.reducer;

// ✅ Selectors
export const selectSelectedMeals = (state: { selectedMeals: TSelectedMealsState }) =>
  state.selectedMeals.selectedMeals;
