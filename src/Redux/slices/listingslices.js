// src/Redux/slices/listingslices.js
import { createSlice } from '@reduxjs/toolkit';

const listingsSlice = createSlice({
  name: 'listings',
  initialState: {
    listings: [],
    loading: false,
    error: null,
    page: 1,
    perPage: 10,  // Number of listings per page
    totalListings: 0,  // Total number of listings (for pagination)
  },
  reducers: {
    fetchListingsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchListingsSuccess(state, action) {
      state.listings = action.payload.listings;
      state.totalListings = action.payload.totalListings;
      state.loading = false;
    },
    fetchListingsFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setPerPage(state, action) {
      state.perPage = action.payload;
    },
  },
});

export const { 
  fetchListingsStart, 
  fetchListingsSuccess, 
  fetchListingsFailure, 
  setPage,
  setPerPage
} = listingsSlice.actions;

export default listingsSlice.reducer;
