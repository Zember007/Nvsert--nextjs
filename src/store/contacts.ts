import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Типы для Contact взяты из открытого файла page.tsx
interface Contact {
  id: number;
  name: string;
  image?: string;
  image_webp?: string;
  address?: string;
  phones?: string[];
  time?: string;
  emails?: string[];
  description?: string;
}

interface ContactsState {
  contacts: Contact[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const updateActionContacts = createAsyncThunk<Contact[], void, { rejectValue: string }>(
  'contacts/updateContacts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/contacts');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState: ContactsState = {
  contacts: [],
  status: 'idle',
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateActionContacts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateActionContacts.fulfilled, (state, action: PayloadAction<Contact[]>) => {
        state.contacts = action.payload;
        state.status = 'succeeded';
      })
      .addCase(updateActionContacts.rejected, (state, action) => {
        state.error = action.payload || 'Failed to fetch contacts';
        state.status = 'failed';
      });
  },
});

export default contactsSlice.reducer;