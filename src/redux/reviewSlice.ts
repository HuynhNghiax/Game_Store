import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const REVIEWS_URL = 'http://localhost:3000/reviews';

export interface Review {
    id: number | string;
    productId: number | string;
    userId: number | string;
    user: string;
    rating: number;
    comment: string;
    createdAt: string;
}

interface ReviewState {
    list: Review[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ReviewState = {
    list: [],
    status: 'idle',
    error: null
};

// 1. Tải bình luận
export const fetchReviews = createAsyncThunk(
    'reviews/fetchReviews',
    async (productId?: number | string) => {
        const url = productId ? `${REVIEWS_URL}?productId=${productId}` : REVIEWS_URL;
        const response = await axios.get<Review[]>(url);
        return response.data;
    }
);

// 2. Gửi bình luận mới
export const postReview = createAsyncThunk(
    'reviews/postReview',
    async (newReview: Omit<Review, 'id'>) => {
        const response = await axios.post<Review>(REVIEWS_URL, newReview);
        return response.data;
    }
);

// 3. Xóa bình luận
export const deleteReview = createAsyncThunk(
    'reviews/deleteReview',
    async (id: number | string) => {
        await axios.delete(`${REVIEWS_URL}/${id}`);
        return id;
    }
);

// 4. Cập nhật bình luận
export const updateReview = createAsyncThunk(
    'reviews/updateReview',
    async ({ id, data }: { id: number | string; data: Partial<Review> }) => {
        const response = await axios.patch<Review>(`${REVIEWS_URL}/${id}`, data);
        return response.data;
    }
);

const reviewSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(fetchReviews.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchReviews.fulfilled, (state, action: PayloadAction<Review[]>) => {
                state.list = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })

            .addCase(postReview.fulfilled, (state, action: PayloadAction<Review>) => {
                state.list.unshift(action.payload);
            })

            .addCase(deleteReview.fulfilled, (state, action: PayloadAction<number | string>) => {
                state.list = state.list.filter(rev => rev.id !== action.payload);
            })

            .addCase(updateReview.fulfilled, (state, action: PayloadAction<Review>) => {
                const index = state.list.findIndex(rev => rev.id === action.payload.id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            });
    }
});

export default reviewSlice.reducer;