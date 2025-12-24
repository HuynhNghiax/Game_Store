import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Game } from '../types';

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Game>) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      
      const price = parseFloat(newItem.price.toString()); 

      if (!existingItem) {
        // Nếu chưa có, thêm mới với quantity = 1
        state.items.push({ ...newItem, quantity: 1 });
      } else {
        // Nếu có rồi, tăng số lượng
        existingItem.quantity++;
      }
      
      state.totalQuantity++;
      state.totalAmount += price;
    },
    removeFromCart: (state, action: PayloadAction<number | string>) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      
      if (existingItem) {
        const price = parseFloat(existingItem.price.toString());
        state.items = state.items.filter((item) => item.id !== id);
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= price * existingItem.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;