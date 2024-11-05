// src/Redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import listingsReducer from './slices/listingslices.js'; // Ensure the path and extension are correct
import userReducer from './slices/userslice.js'; // Ensure this path is correct and userSlice exists

const store = configureStore({
  reducer: {
    listings: listingsReducer,
    user: userReducer, // This should be properly defined in your userslice.js
    // Add other reducers here if you have them
  },
});

export default store;
