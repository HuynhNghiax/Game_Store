import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Game } from '../types';
import { transformFirebaseData } from '../utils/firebaseHelper';

const BASE_URL = import.meta.env.VITE_API_URL;
const IS_FIREBASE = import.meta.env.VITE_SERVER_TYPE === 'firebase';

// Tự động thêm đuôi .json nếu là Firebase
const ENDPOINT = IS_FIREBASE ? '/products.json' : '/products';

interface ProductState {
  items: Game[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  status: 'idle',
  error: null
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts', 
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}${ENDPOINT}`);
      return transformFirebaseData(response.data) as Game[];
    } catch (error) {
      return rejectWithValue('Lỗi tải danh sách game');
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
});

export default productSlice.reducer;