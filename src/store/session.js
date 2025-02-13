import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateActionSessionId = createAsyncThunk(
  'session/updateSessionId',
  async (_, { rejectWithValue, getState }) => {
    try {
      const parsedCookies = document.cookie.split('; ').reduce((acc, cookie) => {
        const [key, value] = cookie.split('=');
        acc[key] = value;
        return acc;
      }, {});

      if (parsedCookies.sessionid) {
        return parsedCookies.sessionid;
      } else {
        const response = await axios.get(`/api/session`);
        const { sessionid, expires } = response.data;

        document.cookie = `sessionid=${sessionid}; expires=${new Date(expires).toUTCString()}; path=/`;

        return sessionid;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    session_id: '',
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateActionSessionId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateActionSessionId.fulfilled, (state, action) => {
        state.session_id = action.payload;
        state.status = 'succeeded';
      })
      .addCase(updateActionSessionId.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      });
  },
});

export default sessionSlice.reducer;