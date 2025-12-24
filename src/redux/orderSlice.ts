import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Order } from '../types';
import { transformFirebaseData } from '../utils/firebaseHelper';

const BASE_URL = import.meta.env.VITE_API_URL;

interface OrderState {
  orders: Order[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  status: 'idle',
  error: null,
};

export const createOrder = createAsyncThunk(
  'orders/create', 
  async (orderData: Order, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/orders.json`, orderData);
      return { ...orderData, id: response.data.name };
    } catch (error) {
      return rejectWithValue("Lỗi khi tạo đơn hàng");
    }
  }
);

export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders', 
  async (userId: string | number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/orders.json`);
      const allOrders = transformFirebaseData(response.data) as Order[];
      
      // Lọc theo userId và sắp xếp mới nhất lên đầu
      const userOrders = allOrders.filter(order => order.userId === userId);
      return userOrders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (error) {
      return rejectWithValue("Lỗi tải lịch sử đơn hàng");
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createOrder.fulfilled, (state, action) => {
        state.orders.unshift(action.payload);
    });
    
    builder
      .addCase(fetchUserOrders.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
});

export default orderSlice.reducer;