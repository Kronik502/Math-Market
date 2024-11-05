// src/redux/reducer.js

import { ADD_LISTING, DELETE_LISTING, UPDATE_LISTING, SET_LISTINGS } from './actions';

const initialState = {
    listings: [], // Initial state for listings
};

const listingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LISTINGS:
            return {
                ...state,
                listings: action.payload,
            };
        case ADD_LISTING:
            return {
                ...state,
                listings: [...state.listings, action.payload],
            };
        case DELETE_LISTING:
            return {
                ...state,
                listings: state.listings.filter((listing) => listing.id !== action.payload),
            };
        case UPDATE_LISTING:
            return {
                ...state,
                listings: state.listings.map((listing) =>
                    listing.id === action.payload.listingId
                        ? { ...listing, ...action.payload.updatedListing }
                        : listing
                ),
            };
        default:
            return state;
    }
};

export default listingsReducer;
