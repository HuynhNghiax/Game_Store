import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000/users';

// 1. Action: Đăng ký
export const registerUser = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  try {
    // Kiểm tra xem email đã tồn tại chưa
    const checkUser = await axios.get(`${API_URL}?email=${userData.email}`);
    if (checkUser.data.length > 0) {
      return rejectWithValue('Email này đã được sử dụng!');
    }
    
    // Nếu chưa, thêm user mới vào db.json
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// 2. Action: Đăng nhập
export const loginUser = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    // Tìm user có email và password khớp
    const response = await axios.get(`${API_URL}?email=${email}&password=${password}`);
    
    if (response.data.length > 0) {
      return response.data[0]; // Trả về user đầu tiên tìm thấy
    } else {
      return rejectWithValue('Email hoặc mật khẩu không đúng!');
    }
  } catch (error) {
    return rejectWithValue('Lỗi kết nối server');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,          // Thông tin user đang đăng nhập
    isAuthenticated: false,
    loading: false,
    error: null,
    successMessage: null
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    clearError: (state) => {
      state.error = null;
      state.successMessage = null;
    }
  },
  extraReducers: (builder) => {
    // Xử lý Đăng ký
    builder
      .addCase(registerUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.successMessage = "Đăng ký thành công! Hãy đăng nhập.";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Xử lý Đăng nhập
    builder
      .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;