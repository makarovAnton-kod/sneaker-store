import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import { productsReducer } from '../features/products/productsSlice';
import { categoriesReducer } from '../features/categories/categoriesSlice';
import { usersReducer } from '../features/users/usersSlice';

const usersPersistConfig = {
  key: 'users',
  storage,
};

const rootReducer = combineReducers({
  // products: productsReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/FLUSH', 'persist/PURGE'],
        },
      }),
});

export const persistor = persistStore(store);

export default store;
