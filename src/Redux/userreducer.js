// src/redux/userReducer.js

import { SET_USER, LOGOUT_USER } from './useraction';

const initialState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      // Save user data to localStorage
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
      };

    case LOGOUT_USER:
      // Clear user data from localStorage
      localStorage.removeItem('user');
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

export default userReducer;
