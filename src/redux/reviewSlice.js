import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const REVIEWS_URL = 'http://localhost:3000/reviews';

// 1. Tải bình luận theo productId
export const fetchReviews = createAsyncThunk(
    'reviews/fetchReviews',
    async (productId) => {
        const response = await axios.get(`${REVIEWS_URL}?productId=${productId}`);
        return response.data;
    }
);

// 2. Gửi bình luận mới
export const postReview = createAsyncThunk(
    'reviews/postReview',
    async (newReview) => {
        const response = await axios.post(REVIEWS_URL, newReview);
        return response.data;
    }
);

// 3. Xóa bình luận
export const deleteReview = createAsyncThunk(
    'reviews/deleteReview',
    async (id) => {
        await axios.delete(`${REVIEWS_URL}/${id}`);
        return id; // Trả về id để lọc bỏ khỏi state
    }
);

// 4. Cập nhật (Sửa) bình luận
export const updateReview = createAsyncThunk(
    'reviews/updateReview',
    async ({ id, data }) => {
        const response = await axios.patch(`${REVIEWS_URL}/${id}`, data);
        return response.data; // Trả về dữ liệu đã sửa
    }
);

const reviewSlice = createSlice({
    name: 'reviews',
    initialState: {
        list: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Load reviews
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.list = action.payload;
                state.status = 'succeeded';
            })
            // Post review
            .addCase(postReview.fulfilled, (state, action) => {
                state.list.unshift(action.payload);
            })
            // Delete review
            .addCase(deleteReview.fulfilled, (state, action) => {
                // Lọc bỏ bình luận vừa xóa ra khỏi danh sách hiển thị
                state.list = state.list.filter(rev => rev.id !== action.payload);
            })
            // Update review
            .addCase(updateReview.fulfilled, (state, action) => {
                // Tìm bình luận cũ trong list và thay thế bằng dữ liệu mới
                const index = state.list.findIndex(rev => rev.id === action.payload.id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            });
    }
});

export default reviewSlice.reducer;