import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { WishlistItem } from '../types';
import { transformFirebaseData } from '../utils/firebaseHelper';

const BASE_URL = import.meta.env.VITE_API_URL;
const IS_FIREBASE = import.meta.env.VITE_SERVER_TYPE === 'firebase';
const ENDPOINT = IS_FIREBASE ? '/wishlist.json' : '/wishlist';

interface WishlistState {
  items: WishlistItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: WishlistState = {
  items: [],
  status: 'idle'
};

export const fetchWishlist = createAsyncThunk(
  'wishlist/fetch', 
  async (userId: string | number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}${ENDPOINT}`);
      const allItems = transformFirebaseData(response.data) as WishlistItem[];
      return allItems.filter(item => item.userId === userId);
    } catch (error) {
      return rejectWithValue("Lỗi tải wishlist");
    }
  }
);

export const toggleWishlist = createAsyncThunk(
  'wishlist/toggle', 
  async ({ userId, gameId }: { userId: string | number, gameId: string | number }, { getState }) => {
    try {
      const state = getState() as any;
      const existingItem = state.wishlist.items.find((item: WishlistItem) => item.gameId === gameId);

      if (existingItem) {
        // XÓA: Cấu trúc URL khác nhau
        // Firebase: .../wishlist/ID.json
        // Json-server: .../wishlist/ID
        const deleteSuffix = IS_FIREBASE ? '.json' : '';
        await axios.delete(`${BASE_URL}/wishlist/${existingItem.id}${deleteSuffix}`);
        
        return { type: 'remove', id: existingItem.id };
      } else {
        // THÊM
        const newItem = { userId, gameId };
        const response = await axios.post(`${BASE_URL}${ENDPOINT}`, newItem);
        
        const newId = IS_FIREBASE ? response.data.name : response.data.id;
        return { type: 'add', item: { id: newId, ...newItem } };
      }
    } catch (error) {
      throw error;
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(toggleWishlist.fulfilled, (state, action) => {
        if (action.payload.type === 'add') {
          state.items.push(action.payload.item as WishlistItem);
        } else {
          state.items = state.items.filter(item => item.id !== action.payload.id);
        }
      });
  }
});

export default wishlistSlice.reducer;