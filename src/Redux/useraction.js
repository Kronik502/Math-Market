// src/redux/userAction.js

export const SET_USER = 'SET_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

// Action to set user
export const setUser = (user) => ({
    type: SET_USER,
    payload: user,
});

// Action to log out user
export const logoutUser = () => ({
    type: LOGOUT_USER,
});
