import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Game } from '../types';
import toast from 'react-hot-toast';

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
}

const loadCartFromStorage = (): CartState => {
  try {
    const serializedState = localStorage.getItem('cart');
    if (serializedState === null) {
      return { items: [], totalQuantity: 0, totalAmount: 0 };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { items: [], totalQuantity: 0, totalAmount: 0 };
  }
};

const saveCartToStorage = (state: CartState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart', serializedState);
  } catch (err) {}
};

const initialState: CartState = loadCartFromStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Game>) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      
      const price = parseFloat(newItem.price.toString()); 

      if (!existingItem) {
        state.items.push({ ...newItem, quantity: 1 });
        toast.success("Đã thêm vào giỏ hàng!");
      } else {
        existingItem.quantity++;
        toast.success("Đã tăng số lượng!");
      }
      state.totalQuantity++;
      state.totalAmount += price;
      saveCartToStorage(state);
    },
    removeFromCart: (state, action: PayloadAction<number | string>) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        const price = parseFloat(existingItem.price.toString());
        state.items = state.items.filter((item) => item.id !== id);
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= price * existingItem.quantity;
        saveCartToStorage(state);
        toast.success("Đã xóa khỏi giỏ hàng");
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      saveCartToStorage(state);
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;