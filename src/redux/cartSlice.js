import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
  },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      // Chuyển giá từ string "59.99" sang số 59.99
      const price = parseFloat(newItem.price);

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          name: newItem.name, // Dùng 'name' thay vì 'title'
          cover: newItem.cover, // Dùng 'cover' thay vì 'image'
          price: price,
          quantity: 1 
        });
      } else {
        existingItem.quantity++;
      }
      
      state.totalQuantity++;
      state.totalAmount += price;
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        state.items = state.items.filter(item => item.id !== id);
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= (existingItem.price * existingItem.quantity);
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    }
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;