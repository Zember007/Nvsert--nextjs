import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateActionArticle = createAsyncThunk(
  'article/updateArticle',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/article/${slug}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const articleSlice = createSlice({
  name: 'article',
  initialState: {
    article: {},
    SEO: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateActionArticle.fulfilled, (state, action) => {
        state.article = action.payload;
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
      .addCase(updateActionArticle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateActionArticle.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      });
  },
});

export default articleSlice.reducer;