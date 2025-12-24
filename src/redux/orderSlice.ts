import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Order } from '../types';

const API_URL = 'http://localhost:3000/orders';

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

// Tạo đơn hàng mới
export const createOrder = createAsyncThunk(
  'orders/create', 
  async (orderData: Order, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue("Lỗi khi tạo đơn hàng");
    }
  }
);

// Lấy lịch sử đơn hàng
export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders', 
  async (userId: string | number, { rejectWithValue }) => {
    try {
      const response = await axios.get<Order[]>(`${API_URL}?userId=${userId}&_sort=date&_order=desc`);
      return response.data;
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
    // Create Order
    builder.addCase(createOrder.fulfilled, (state, action) => {
        state.orders.unshift(action.payload);
    });
    
    // Fetch Orders
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