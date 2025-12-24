import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { WishlistItem } from '../types';

const API_URL = 'http://localhost:3000/wishlist';

interface WishlistState {
  items: WishlistItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: WishlistState = {
  items: [],
  status: 'idle'
};

// Lấy danh sách wishlist của user
export const fetchWishlist = createAsyncThunk(
  'wishlist/fetch', 
  async (userId: string | number, { rejectWithValue }) => {
    try {
      const response = await axios.get<WishlistItem[]>(`${API_URL}?userId=${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue("Lỗi tải wishlist");
    }
  }
);

// Toggle (Thêm/Xóa) wishlist
export const toggleWishlist = createAsyncThunk(
  'wishlist/toggle', 
  async ({ userId, gameId }: { userId: string | number, gameId: string | number }, { getState, dispatch }) => {
    try {
      // Lấy state hiện tại để kiểm tra xem đã like chưa
      const state = getState() as { wishlist: WishlistState };
      const existingItem = state.wishlist.items.find(item => item.gameId === gameId);

      if (existingItem) {
        // Nếu đã có -> Xóa
        await axios.delete(`${API_URL}/${existingItem.id}`);
        return { type: 'remove', id: existingItem.id };
      } else {
        // Nếu chưa có -> Thêm
        const newItem = { userId, gameId };
        const response = await axios.post(API_URL, newItem);
        return { type: 'add', item: response.data };
      }
    } catch (error) {
      console.error(error);
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
          // Ép kiểu action.payload.item vì TS có thể hiểu nhầm
          state.items.push(action.payload.item as WishlistItem);
        } else {
          state.items = state.items.filter(item => item.id !== action.payload.id);
        }
      });
  }
});

export default wishlistSlice.reducer;