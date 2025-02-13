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

const store = configureStore({
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
    documents: documentsReducer
  },
});

export default store;