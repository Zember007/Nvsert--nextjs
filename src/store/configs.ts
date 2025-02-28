import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Типы для Config взяты из открытого файла page.tsx
interface Config {
  key: string;
  value: string;
}

interface ConfigsState {
  configs: Config[] | null;
  file_configs: Config[] | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const updateActionConfigs = createAsyncThunk<Config[], void, { rejectValue: string }>(
  'configs/updateConfigs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/configs');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateActionFileConfigs = createAsyncThunk<Config[], void, { rejectValue: string }>(
  'configs/updateFileConfigs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/file-configs');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState: ConfigsState = {
  configs: null,
  file_configs: null,
  status: 'idle',
  error: null,
};

const configSlice = createSlice({
  name: 'configs',
  initialState,
  reducers: {
    updateConfigs: (state, action: PayloadAction<Config[]>) => {
      state.configs = action.payload;
    },
    updateFileConfigs: (state, action: PayloadAction<Config[]>) => {
      state.file_configs = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateActionConfigs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateActionConfigs.fulfilled, (state, action: PayloadAction<Config[]>) => {
        state.configs = action.payload;
        state.status = 'succeeded';
      })
      .addCase(updateActionConfigs.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.error = action.payload || 'Failed to fetch configs';
        state.status = 'failed';
      })
      .addCase(updateActionFileConfigs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateActionFileConfigs.fulfilled, (state, action: PayloadAction<Config[]>) => {
        state.file_configs = action.payload;
        state.status = 'succeeded';
      })
      .addCase(updateActionFileConfigs.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.error = action.payload || 'Failed to fetch file configs';
        state.status = 'failed';
      });
  },
});

export const { updateConfigs, updateFileConfigs } = configSlice.actions;
export default configSlice.reducer;