import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../types';
import { transformFirebaseData } from '../utils/firebaseHelper';

const BASE_URL = import.meta.env.VITE_API_URL;
const IS_FIREBASE = import.meta.env.VITE_SERVER_TYPE === 'firebase';
const ENDPOINT = IS_FIREBASE ? '/users.json' : '/users';

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

// ĐĂNG KÝ
export const registerUser = createAsyncThunk(
  'auth/register', 
  async (userData: Omit<User, 'id'>, { rejectWithValue }) => {
    try {
      // 1. Kiểm tra email tồn tại
      const checkRes = await axios.get(`${BASE_URL}${ENDPOINT}`);
      const users = transformFirebaseData(checkRes.data) as User[];
      const exists = users.find(u => u.email === userData.email);
      
      if (exists) return rejectWithValue('Email này đã được sử dụng!');

      // 2. Tạo user
      const response = await axios.post(`${BASE_URL}${ENDPOINT}`, userData);
      
      // Xử lý ID: Firebase trả về {name: "ID"}, json-server trả về {id: "ID", ...}
      const newId = IS_FIREBASE ? response.data.name : response.data.id;
      
      return { id: newId, ...userData };
    } catch (error: any) {
      return rejectWithValue('Lỗi đăng ký');
    }
  }
);

// ĐĂNG NHẬP
export const loginUser = createAsyncThunk(
  'auth/login', 
  async ({ email, password }: Pick<User, 'email' | 'password'>, { rejectWithValue }) => {
    try {
      // Tải hết về rồi lọc (Cách an toàn nhất cho cả 2 server)
      const response = await axios.get(`${BASE_URL}${ENDPOINT}`);
      const users = transformFirebaseData(response.data) as User[];

      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        return user;
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
      .addCase(registerUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(registerUser.fulfilled, (state) => { 
        state.loading = false; 
        state.successMessage = "Đăng ký thành công! Vui lòng đăng nhập."; 
      })
      .addCase(registerUser.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.payload as string; 
      })
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