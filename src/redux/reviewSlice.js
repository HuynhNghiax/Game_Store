import { createSlice } from '@reduxjs/toolkit';

const reviewSlice = createSlice({
    name: 'reviews',
    initialState: {
        list: [],       // danh sách review
        totalReviews: 0 // tổng số đánh giá
    },
    reducers: {
        addReview(state, action) {
            const newReview = action.payload;

            state.list.push({
                id: Date.now(),      // id đơn giản
                rating: newReview.rating,
                comment: newReview.comment,
                user: newReview.user || 'Guest',
                createdAt: new Date().toISOString()
            });

            state.totalReviews++;
        },

        removeReview(state, action) {
            const id = action.payload;
            state.list = state.list.filter(review => review.id !== id);
            state.totalReviews = state.list.length;
        },

        clearReviews(state) {
            state.list = [];
            state.totalReviews = 0;
        }
    }
});

export const {
    addReview,
    removeReview,
    clearReviews
} = reviewSlice.actions;

export default reviewSlice.reducer;
