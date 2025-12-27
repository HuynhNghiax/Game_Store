import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { 
  persistStore, 
  persistReducer,
  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER 
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Mặc định là localStorage
import cartReducer from './cartSlice';
import authReducer from './authSlice';
import productReducer from './productSlice';
import orderReducer from './orderSlice';
import wishlistReducer from './wishlistSlice';
import reviewReducer from './reviewSlice';

// Cấu hình lưu trữ (Persist)
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['cart', 'auth'] // Chỉ lưu giỏ hàng và thông tin đăng nhập
};

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  products: productReducer,
  orders: orderReducer,
  wishlist: wishlistReducer,
  reviews: reviewReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Bỏ qua kiểm tra tuần tự hóa cho các action của Redux Persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// --- QUAN TRỌNG: Xuất kiểu dữ liệu để dùng cho Hooks ---
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;