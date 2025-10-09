import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface FaqItem {
  id: number;
  documentId: string;
  heading: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

interface FaqState {
  faqs: FaqItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const fetchFaqs = createAsyncThunk<
  FaqItem[],
  void,
  { rejectValue: string }
>(
  'faq/fetchFaqs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/faqs`);
      const data: FaqItem[] = response.data.data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState: FaqState = {
  faqs: [],
  status: 'idle',
  error: null,
};

const faqSlice = createSlice({
  name: 'faq',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFaqs.fulfilled, (state, action: PayloadAction<FaqItem[]>) => {
        state.faqs = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchFaqs.pending, (state) => {
        state.faqs = [];
        state.status = 'loading';
      })
      .addCase(fetchFaqs.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.error = action.payload || 'Failed to fetch FAQs';
        state.faqs = [];
        state.status = 'failed';
      });
  },
});

export default faqSlice.reducer;

