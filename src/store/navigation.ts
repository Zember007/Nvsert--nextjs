import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { log } from 'console';

interface NavigationItem1 {
  id?: number
  title: string;
  full_slug: string;
  slug?: string;
  article_preview?: string;
  children: NavigationItem[];
  seo_h1?: string;
  short_text?: string;
}

export interface NavigationItem {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  duration: string;
  price: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  documents: any[];
  img: any;
  category: any;
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
      const response = await axios.get(`/api/services`);
      console.log(response.data.data);

      return response.data.data
    } catch (error: any) {
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
      /* const response = await axios.get(`/api/section-services?ordering=${ordering}`); */
      return [];
    } catch (error: any) {
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
        state.navigation = []
        state.status = 'loading';
      })
      .addCase(updateActionNavigation.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.error = action.payload || 'Failed to fetch navigation';
        state.navigation = []
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