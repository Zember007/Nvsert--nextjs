import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateActionConfigs = createAsyncThunk('configs/updateConfigs', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/api/configs');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const updateActionFileConfigs = createAsyncThunk('configs/updateFileConfigs', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/api/file-configs');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

const configSlice = createSlice({
  name: 'configs',
  initialState: {
    configs: null,
    file_configs: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    updateConfigs: (state, action) => {
      state.configs = action.payload;
    },
    updateFileConfigs: (state, action) => {
      state.file_configs = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateActionConfigs.fulfilled, (state, action) => {
        state.configs = action.payload;
      })
      .addCase(updateActionConfigs.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateActionFileConfigs.fulfilled, (state, action) => {
        state.file_configs = action.payload;
      })
      .addCase(updateActionFileConfigs.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { updateConfigs, updateFileConfigs } = configSlice.actions;
export default configSlice.reducer;