import { createSlice } from '@reduxjs/toolkit';

// Initial state for the cart
const initialState = {
  items: [],
  totalPrice: 0
};

// Cart slice with actions and reducer
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      state.items.push(item);
      state.totalPrice += item.price * item.quantity;
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const itemIndex = state.items.findIndex(item => item.id === id);
      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        state.items.splice(itemIndex, 1);
        state.totalPrice -= item.price * item.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    }
  }
});

// Selectors (you can create memoized selectors with createSelector if needed)
export const selectCartItemsMemoized = (state) => state.cart; // This selects the cart slice from the state

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
