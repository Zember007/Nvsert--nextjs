import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateActionContacts = createAsyncThunk(
  'contacts/updateContacts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/contacts');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateActionContacts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateActionContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
        state.status = 'succeeded';
      })
      .addCase(updateActionContacts.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      });
  },
});

export default contactsSlice.reducer;