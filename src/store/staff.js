import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateActionStaff = createAsyncThunk(
  'staff/updateStaff',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/staff');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const staffSlice = createSlice({
  name: 'staff',
  initialState: {
    staff: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateActionStaff.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateActionStaff.fulfilled, (state, action) => {
        state.staff = action.payload;
        state.status = 'succeeded';
      })
      .addCase(updateActionStaff.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      });
  },
});

export default staffSlice.reducer;