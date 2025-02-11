// store/searchSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Используйте axios или fetch для запросов
const initialState = {
  searchResults: {},
  searchDefault: {},
  isLoading: false,
  error: null,
};

// 2. Асинхронные actions (createAsyncThunk)
//Аналог resetActionSearchResults
export const resetActionSearchResults = createAsyncThunk(
  'search/resetActionSearchResults',
  async (_, { dispatch }) => {
    // Логика сброса результатов поиска
    dispatch(setSearchResults(initialState.searchResults)); // Используем синхронный action setSearchResult
    // updateStateFlag = false; // Не нужно, если нет зависимости от внешнего состояния
  }
);

//Аналог updateDefaultResults
export const updateDefaultResults = createAsyncThunk(
  'search/updateDefaultResults',
  async (limit) => {
    try {
      const response = await axios.get('/api/search/default', {
        params: {
          limit,
        },
      });
      return response.data; // Возвращаем данные, которые попадут в `payload` fulfilled
    } catch (error) {
      throw error; // Пробрасываем ошибку, которая попадет в rejected
    }
  }
);


export const updateSearchResults = createAsyncThunk(
  'search/updateSearchResults',
  async ({ slug = 'article', search, limit }) => {
    try {
      const response = await axios.get(`/api/search/${slug}`, {
        params: {
          search,
          limit,
        },
      });
      // if (updateStateFlag) { // Не нужно, если нет зависимости от внешнего состояния
      return response.data; // Возвращаем данные
      // }
    } catch (error) {
      throw error;
    }
  }
);


const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    // Синхронные мутации (setters, аналог mutations)
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    updateSearchDefaultSync: (state, action) => { // Можно убрать, т.к. используем extraReducers
      state.searchDefault = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Обработка состояний асинхронных actions (замена для commit + mutations)
    builder
      // resetActionSearchResults
      .addCase(resetActionSearchResults.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetActionSearchResults.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetActionSearchResults.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // updateDefaultResults
      .addCase(updateDefaultResults.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateDefaultResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchDefault = action.payload;
      })
      .addCase(updateDefaultResults.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // updateSearchResults
      .addCase(updateSearchResults.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateSearchResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(updateSearchResults.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});


export const { setSearchResults, updateSearchDefaultSync } = searchSlice.actions; 




export default searchSlice.reducer;


export const selectSearchResults = (state) => state.search.searchResults;
export const selectSearchDefault = (state) => state.search.searchDefault;
export const selectIsLoading = (state) => state.search.isLoading;
export const selectError = (state) => state.search.error;