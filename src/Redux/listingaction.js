// src/redux/actions.js

// Action Types
export const ADD_LISTING = 'ADD_LISTING';
export const DELETE_LISTING = 'DELETE_LISTING';
export const UPDATE_LISTING = 'UPDATE_LISTING';
export const SET_LISTINGS = 'SET_LISTINGS';

// Action Creators
export const addListing = (listing) => ({
    type: ADD_LISTING,
    payload: listing,
});

export const deleteListing = (listingId) => ({
    type: DELETE_LISTING,
    payload: listingId,
});

export const updateListing = (listingId, updatedListing) => ({
    type: UPDATE_LISTING,
    payload: { listingId, updatedListing },
});

export const setListings = (listings) => ({
    type: SET_LISTINGS,
    payload: listings,
});
