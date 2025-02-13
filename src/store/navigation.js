import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateActionNavigation = createAsyncThunk(
  'navigation/updateNavigation',
  async (ordering = '', { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/sections/tree?ordering=${ordering}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateActionServices = createAsyncThunk(
  'services/updateServices',
  async (ordering = '', { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/section-services?ordering=${ordering}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    navigation: [],
    services: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateActionNavigation.fulfilled, (state, action) => {
        state.navigation = action.payload;
        state.status = 'succeeded';
      })
      .addCase(updateActionNavigation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateActionNavigation.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(updateActionServices.fulfilled, (state, action) => {
        state.services = action.payload;
        state.status = 'succeeded';
      })
       .addCase(updateActionServices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateActionServices.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      });
  },
});

export default navigationSlice.reducer;