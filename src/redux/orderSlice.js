import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000/orders';

// 1. Tạo đơn hàng mới
export const createOrder = createAsyncThunk('orders/create', async (orderData, { rejectWithValue }) => {
  try {
    const response = await axios.post(API_URL, orderData);
    return response.data;
  } catch (error) {
    return rejectWithValue("Lỗi khi tạo đơn hàng");
  }
});

// 2. Lấy lịch sử đơn hàng của User
export const fetchUserOrders = createAsyncThunk('orders/fetchUserOrders', async (userId, { rejectWithValue }) => {
  try {
    // Gọi API lọc theo userId (json-server hỗ trợ sẵn)
    const response = await axios.get(`${API_URL}?userId=${userId}&_sort=date&_order=desc`);
    return response.data;
  } catch (error) {
    return rejectWithValue("Lỗi tải lịch sử đơn hàng");
  }
});

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Xử lý tạo đơn
    builder.addCase(createOrder.fulfilled, (state, action) => {
        state.orders.unshift(action.payload); // Thêm đơn mới vào đầu danh sách
    });
    
    // Xử lý lấy danh sách
    builder
      .addCase(fetchUserOrders.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default orderSlice.reducer;