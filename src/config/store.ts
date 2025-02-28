import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '@/store/search';
import configReducer from '@/store/configs';
import navigationReducer from '@/store/navigation';
import bodyReducer from '@/store/body';
import articleReducer from '@/store/article';
import articlesReducer from '@/store/articles';
import classReducer from '@/store/class';
import contactsReducer from '@/store/contacts';
import pagesReducer from '@/store/pages';
import sessionReducer from '@/store/session';
import staffReducer from '@/store/staff';
import documentsReducer from '@/store/documents';
import metadataReducer from '@/store/metadata';
import find_out_costReducer from '@/store/find_out_cost';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    config: configReducer,
    navigation: navigationReducer,
    body: bodyReducer,
    article: articleReducer,
    articles: articlesReducer,
    class: classReducer,
    contacts: contactsReducer,
    pages: pagesReducer,
    session: sessionReducer,
    staff: staffReducer,
    documents: documentsReducer,
    metadata: metadataReducer,
    find_out_cost: find_out_costReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;