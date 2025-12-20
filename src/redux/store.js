import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { 
  persistStore, 
  persistReducer,
  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER 
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './cartSlice';
import authReducer from './authSlice';
import productReducer from './productSlice';
import orderReducer from './orderSlice';
import wishlistReducer from './wishlistSlice';
import reviewReducer from './reviewSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['cart', 'auth']
};

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  products: productReducer,
  orders: orderReducer,
  wishlist: wishlistReducer,
  reviews: reviewReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;