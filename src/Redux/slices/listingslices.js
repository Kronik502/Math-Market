// src/Redux/slices/listingslices.js

import { createSlice } from '@reduxjs/toolkit';

const listingsSlice = createSlice({
  name: 'listings',
  initialState: {
    listings: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchListingsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchListingsSuccess(state, action) {
      state.listings = action.payload;
      state.loading = false;
    },
    fetchListingsFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Export actions and reducer
export const { fetchListingsStart, fetchListingsSuccess, fetchListingsFailure } = listingsSlice.actions;
export default listingsSlice.reducer;
