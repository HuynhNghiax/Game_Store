import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const REVIEWS_URL = 'http://localhost:3000/reviews';

// Tải bình luận theo productId
export const fetchReviews = createAsyncThunk(
    'reviews/fetchReviews',
    async (productId) => {
        const response = await axios.get(`${REVIEWS_URL}?productId=${productId}`);
        return response.data;
    }
);

// Gửi bình luận mới
export const postReview = createAsyncThunk(
    'reviews/postReview',
    async (newReview) => {
        const response = await axios.post(REVIEWS_URL, newReview);
        return response.data;
    }
);

const reviewSlice = createSlice({
    name: 'reviews',
    initialState: {
        list: [],
        status: 'idle'
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Xử lý load reviews
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.list = action.payload;
            })
            // Xử lý gửi review thành công
            .addCase(postReview.fulfilled, (state, action) => {
                state.list.unshift(action.payload); // Đưa bình luận mới lên đầu danh sách
            });
    }
});

export default reviewSlice.reducer;