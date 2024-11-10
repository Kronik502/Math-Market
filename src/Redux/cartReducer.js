// src/redux/reducers/cartReducer.js

import { ADD_TO_CART, REMOVE_FROM_CART } from '../Redux/CartActions.js';

const initialState = {
  cart: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // Check if the item already exists in the cart
      const itemExists = state.cart.some(item => item.id === action.payload.id);
      if (itemExists) {
        return {
          ...state,
          cart: state.cart.map(item => 
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 } // Increment quantity
              : item
          ),
        };
      }
      // Add new item to cart with quantity set to 1
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
      
    case REMOVE_FROM_CART:
      // Remove item from cart by id
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };

    default:
      return state;
  }
};
