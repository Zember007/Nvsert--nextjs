import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  discountSum: 0,
  currentStep: 1,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    nextStep: (state) => {
      if (state.currentStep < 3) {
        state.currentStep += 1;
      }
    },
    previousStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    setDiscount: (state, action) => {
      state.discountSum = action.payload;
    },
  },
});

export const { nextStep, previousStep, setDiscount } = formSlice.actions;

export default formSlice.reducer;