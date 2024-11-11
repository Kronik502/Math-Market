// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fullName: '',
  surname: '',
  email: '',
  address: '',
  cellNumber: '',
  dob: '',
  gender: '',
  photoURL: null, // Store base64 photo here
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Set user details when logging in
    setUserDetails: (state, action) => {
      state.fullName = action.payload.fullName;
      state.surname = action.payload.surname;
      state.email = action.payload.email;
      state.address = action.payload.address;
      state.cellNumber = action.payload.cellNumber;
      state.dob = action.payload.dob;
      state.gender = action.payload.gender;
      state.photoURL = action.payload.photoURL;
    },
    
    // Reset user details on logout
    logoutUser: (state) => {
      return initialState;
    }
  },
});

export const { setUserDetails, logoutUser } = userSlice.actions;

export default userSlice.reducer;
