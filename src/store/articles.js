import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const defaultState = { articles: {} };

export const updateActionArticles = createAsyncThunk(
  'articles/updateArticles',
  async (
    { id, ordering = '', page, pageSize = '', search = '', okp = '', tnved = '' },
    { rejectWithValue }
  ) => {
    let url = id ? `/api/articles/${id}` : '/api/articles';
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

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: {},
    status: 'idle',
    error: null,
  },
  reducers: {
    resetArticles: (state) => {
      Object.assign(state, defaultState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateActionArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateActionArticles.fulfilled, (state, action) => {
        state.articles = action.payload;
        state.status = 'succeeded';
      })
      .addCase(updateActionArticles.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      });
  },
});

export const { resetArticles } = articlesSlice.actions;
export default articlesSlice.reducer;