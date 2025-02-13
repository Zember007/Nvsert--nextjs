import { createSlice } from '@reduxjs/toolkit';

const overflowSlice = createSlice({
  name: 'overflow',
  initialState: {
    overflow: false,
  },
  reducers: {
    enableOverflow: (state) => {
      state.overflow = true;
    },
    disableOverflow: (state) => {
      state.overflow = false;
    },
    updateOverflow: (state, action) => {
      state.overflow = action.payload;
    }
  },
});

export const { enableOverflow, disableOverflow, updateOverflow } = overflowSlice.actions;
export default overflowSlice.reducer;