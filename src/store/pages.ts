import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Page {
  title: string;
  og_description: string;
  og_image: string;
  og_title: string;
  seo_description: string;
  seo_h1: string;
  seo_keywords: string;
  seo_title: string;
}

interface Article {
  id?: string;
  seo_h1?: string;
  title?: string;
  content?: { id: string }[];
  next?: string;
  previous?: string;
  totalElements?: number;
  totalPages?: number;
  pageSize?: number;
}

interface PagesState {
  pages: Article;
  SEO: Partial<Page>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const defaultState: PagesState = { pages: {}, SEO: {}, status: 'idle', error: null };

export const updateActionPages = createAsyncThunk(
  'pages/updatePages',
  async (
    { route, ordering = '', page, pageSize = 12, search = '', okp = '', tnved = '' }: 
    { route: string; ordering?: string; page: number; pageSize?: number; search?: string; okp?: string; tnved?: string },
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
    } catch (error:any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const pagesSlice = createSlice({
  name: 'pages',
  initialState: defaultState,
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
      .addCase(updateActionPages.fulfilled, (state, action: PayloadAction<any>) => {
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
      .addCase(updateActionPages.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.status = 'failed';
      });
  },
});

export const { resetPages } = pagesSlice.actions;
export default pagesSlice.reducer;