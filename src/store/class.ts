import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ClassState {
  class: {
    content: any[];
    page: number | null;
    pageSize: number | null;
    totalPages: number | null;
  };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

interface FetchParams {
  type: string;
  ordering?: string;
  page?: number;
  pageSize?: string | number;
}

export const updateActionClass = createAsyncThunk(
  'class/updateClass',
  async ({ type, ordering = '', page = 1, pageSize = '' }: FetchParams, { rejectWithValue }) => {
    if (type !== 'okp' && type !== 'tn') return rejectWithValue('Invalid type');

    try {
      const response = await axios.get(`/api/${type}`, {
        params: {
          ordering: ordering,
          page: page,
          pageSize: pageSize,
        },
      });
      
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateActionMoreClass = createAsyncThunk(
  'class/updateMoreClass',
  async ({ type, ordering = '', page, pageSize = '' }: FetchParams, { rejectWithValue }) => {
    if (type !== 'okp' && type !== 'tn') return rejectWithValue('Invalid type');

    try {
      const response = await axios.get(`/api/${type}`, {
        params: {
          ordering: ordering,
          page: page,
          pageSize: pageSize,
        },
      });      
      
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState: ClassState = {
  class: {
    content: [],
    page: null,
    pageSize: null,
    totalPages: null,
  },
  status: 'idle',
  error: null,
};

const classSlice = createSlice({
  name: 'class',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateActionClass.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateActionClass.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.class = action.payload;
      })
      .addCase(updateActionClass.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(updateActionMoreClass.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateActionMoreClass.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.class.page = action.payload.page;
        state.class.content = state.class.content.concat(action.payload.content);
      })
      .addCase(updateActionMoreClass.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default classSlice.reducer;