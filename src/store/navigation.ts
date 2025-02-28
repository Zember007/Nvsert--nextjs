import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface NavigationItem {
  id?: number
  title: string;
  full_slug: string;
  article_preview?: string;
  children: NavigationItem[];
}

interface NavigationState {
  navigation: NavigationItem[];
  services: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const updateActionNavigation = createAsyncThunk<
  NavigationItem[],
  string | undefined,
  { rejectValue: string }
>(
  'navigation/updateNavigation',
  async (ordering = '', { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/sections/tree?ordering=${ordering}`);
      return response.data;
    } catch (error:any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateActionServices = createAsyncThunk<
  any[],
  string,
  { rejectValue: string }
>(
  'services/updateServices',
  async (ordering = '', { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/section-services?ordering=${ordering}`);
      return response.data;
    } catch (error:any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState: NavigationState = {
  navigation: [],
  services: [],
  status: 'idle',
  error: null,
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateActionNavigation.fulfilled, (state, action: PayloadAction<NavigationItem[]>) => {
        state.navigation = action.payload;
        state.status = 'succeeded';
      })
      .addCase(updateActionNavigation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateActionNavigation.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.error = action.payload || 'Failed to fetch navigation';
        state.status = 'failed';
      })
      .addCase(updateActionServices.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.services = action.payload;
        state.status = 'succeeded';
      })
      .addCase(updateActionServices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateActionServices.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.error = action.payload || 'Failed to fetch services';
        state.status = 'failed';
      });
  },
});

export default navigationSlice.reducer;