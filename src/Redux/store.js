// src/Redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import listingsReducer from './slices/listingslices.js'; // Make sure the path is correct
import userReducer from './slices/userslice.js'; // Make sure the path is correct
import { cartReducer } from '../Redux/cartReducer.js'; // Import the cartReducer

const store = configureStore({
  reducer: {
    listings: listingsReducer,
    user: userReducer, // Your user slice
    cart: cartReducer, // Add the cart reducer here
  },
});

export default store;
