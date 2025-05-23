import { createSlice } from '@reduxjs/toolkit';

const getInitialCart = () => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('Failed to parse cart from localStorage:', e);
    return [];
  }
};

const initialState = {
  items: getInitialCart(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      try {
        localStorage.setItem('cart', JSON.stringify(state.items));
      } catch (e) {
        console.error('Failed to save cart to localStorage:', e);
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
      try {
        localStorage.setItem('cart', JSON.stringify(state.items));
      } catch (e) {
        console.error('Failed to update cart in localStorage:', e);
      }
    },
    updateQuantity: (state, action) => {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      try {
        localStorage.setItem('cart', JSON.stringify(state.items));
      } catch (e) {
        console.error('Failed to update cart quantity in localStorage:', e);
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
