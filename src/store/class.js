import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateActionСlass = createAsyncThunk(
  'class/updateClass',
  async ({ type, ordering = '', page = 1, pageSize = '' }, { rejectWithValue }) => {
    if (type !== 'okp' && type !== 'tn') return rejectWithValue('Invalid type');

    try {
      const response = await axios.get(`api/${type}`, {
        params: {
          ordering: ordering,
          page: page,
          pageSize: pageSize,
        },
      });
      console.log(response,'response.data');
      
      return { type, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateActionMoreСlass = createAsyncThunk(
  'class/updateMoreClass',
  async ({ type, ordering = '', page, pageSize = '' }, { rejectWithValue }) => {
    if (type !== 'okp' && type !== 'tn') return rejectWithValue('Invalid type');

    try {
      const response = await axios.get(`api/${type}`, {
        params: {
          ordering: ordering,
          page: page,
          pageSize: pageSize,
        },
      });
      return { type, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


const classSlice = createSlice({
  name: 'class',
  initialState: {
    class: {
      content: [],
      page: null,
      pageSize: null,
      total: null,
    },
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateActionСlass.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateActionСlass.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.class = action.payload.data;

      })
      .addCase(updateActionСlass.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateActionMoreСlass.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateActionMoreСlass.fulfilled, (state, action) => {
         state.status = 'succeeded';
         state.class.page = action.payload.data.page;
         state.class.content = state.class.content.concat(action.payload.data.content);
      })
      .addCase(updateActionMoreСlass.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default classSlice.reducer;