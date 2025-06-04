import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: 'Декларирование, сертификация, лицензирование.',
  description: 'Сертификация оборудования, разработка технических документов, свидетельств государственной регистрации, экспертных заключений.',
  keywords: '',
  openGraph: {
    title: '',
    description: '',
    images: [],
  },
  alternates: {
    canonical: '',
  },
};

const metadataSlice = createSlice({
  name: 'metadata',
  initialState,
  reducers: {
    setMetadata: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setMetadata } = metadataSlice.actions;
export default metadataSlice.reducer;