import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const defaultState = { pages: {} };

export const updateActionPages = createAsyncThunk(
  'pages/updatePages',
  async (
    { route, ordering = '', page, pageSize = 12, search = '', okp = '', tnved = '' },
    { rejectWithValue }
  ) => {
    const url = route ? `/api/pages/${route}` : '/api/pages';

    try {
      const response = await axios.get(url, {
        params: {
          ordering: ordering,
          page: page,
          pageSize: pageSize,
          search,
          okp,
          tnved,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const pagesSlice = createSlice({
  name: 'pages',
  initialState: {
    pages: {},
    SEO: {},
    status: 'idle',
    error: null,
  },
  reducers: {
    resetPages: (state) => {
      Object.assign(state, defaultState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateActionPages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateActionPages.fulfilled, (state, action) => {
        state.pages = action.payload;
        state.SEO = {
          title: action.payload.title,
          og_description: action.payload.og_description,
          og_image: action.payload.og_image,
          og_title: action.payload.og_title,
          seo_description: action.payload.seo_description,
          seo_h1: action.payload.seo_h1,
          seo_keywords: action.payload.seo_keywords,
          seo_title: action.payload.seo_title,
        };
        state.status = 'succeeded';
      })
      .addCase(updateActionPages.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      });
  },
});

export const { resetPages } = pagesSlice.actions;
export default pagesSlice.reducer;