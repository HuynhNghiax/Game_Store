import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000/wishlist';

// 1. Lấy danh sách yêu thích của User
export const fetchWishlist = createAsyncThunk('wishlist/fetch', async (userId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}?userId=${userId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue("Lỗi tải wishlist");
  }
});

// 2. Toggle Tim (Thích / Bỏ thích)
export const toggleWishlist = createAsyncThunk('wishlist/toggle', async ({ userId, gameId }, { dispatch, getState }) => {
  try {
    const { items } = getState().wishlist;
    const existingItem = items.find(item => item.gameId === gameId);

    if (existingItem) {
      // Nếu đã thích -> Xóa (DELETE)
      await axios.delete(`${API_URL}/${existingItem.id}`);
      return { type: 'remove', id: existingItem.id };
    } else {
      // Nếu chưa thích -> Thêm (POST)
      const newItem = { userId, gameId };
      const response = await axios.post(API_URL, newItem);
      return { type: 'add', item: response.data };
    }
  } catch (error) {
    console.error(error);
  }
});

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: { items: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(toggleWishlist.fulfilled, (state, action) => {
        if (action.payload.type === 'add') {
          state.items.push(action.payload.item);
        } else {
          state.items = state.items.filter(item => item.id !== action.payload.id);
        }
      });
  }
});

export default wishlistSlice.reducer;