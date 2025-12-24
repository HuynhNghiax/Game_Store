import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../types'; // Import Interface User

const API_URL = 'http://localhost:3000/users';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  successMessage: null
};

// Đăng ký
export const registerUser = createAsyncThunk(
  'auth/register', 
  async (userData: Omit<User, 'id'>, { rejectWithValue }) => {
    try {
      // Kiểm tra email tồn tại
      const checkUser = await axios.get(`${API_URL}?email=${userData.email}`);
      if (checkUser.data.length > 0) {
        return rejectWithValue('Email này đã được sử dụng!');
      }
      // Tạo user mới
      const response = await axios.post(API_URL, userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Lỗi đăng ký');
    }
  }
);

// Đăng nhập
export const loginUser = createAsyncThunk(
  'auth/login', 
  async ({ email, password }: Pick<User, 'email' | 'password'>, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}?email=${email}&password=${password}`);
      if (response.data.length > 0) {
        return response.data[0]; // Trả về user tìm thấy
      } else {
        return rejectWithValue('Email hoặc mật khẩu không đúng!');
      }
    } catch (error) {
      return rejectWithValue('Lỗi kết nối server');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.successMessage = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
      state.successMessage = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Register logic
      .addCase(registerUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(registerUser.fulfilled, (state) => { 
        state.loading = false; 
        state.successMessage = "Đăng ký thành công! Vui lòng đăng nhập."; 
      })
      .addCase(registerUser.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.payload as string; 
      })
      // Login logic
      .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.payload as string; 
      });
  }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;