import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '@/store/search'; // Import searchSlice

const store = configureStore({
  reducer: {
    search: searchReducer, // Добавляем searchReducer в store
  },
});

export default store;