import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '@/store/search'; // Import searchSlice
import configReducer from '@/store/configs'; // Import searchSlice

const store = configureStore({
  reducer: {
    search: searchReducer, 
    config: configReducer
  },
});

export default store;