// src/redux/userAction.js

import { SET_USER, LOGOUT_USER } from './userAction';

// Action to set user
export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

// Action to log out user
export const logoutUser = () => ({
  type: LOGOUT_USER,
});

// Async action for logging in (example using redux-thunk)
export const loginUser = (credentials) => async (dispatch) => {
  try {
    // Example API call for user login (replace with your actual API)
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: { 'Content-Type': 'application/json' },
    });
    const userData = await response.json();

    if (response.ok) {
      // Dispatch the setUser action with the returned user data
      dispatch(setUser(userData));
    } else {
      // Handle error (e.g., show error message)
      console.error('Login failed');
    }
  } catch (error) {
    console.error('Error during login:', error);
  }
};
