// redux/userSlice.js
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
    setUserDetails: (state, action) => {
      const { email, cellNumber, dob } = action.payload;

      // Basic validation (this can be extended as needed)
      if (email && !/\S+@\S+\.\S+/.test(email)) {
        console.error('Invalid email format');
        return state;
      }
      if (cellNumber && !/^\d{10}$/.test(cellNumber)) {
        console.error('Invalid cell number format');
        return state;
      }
      if (dob && new Date(dob) > new Date()) {
        console.error('Invalid date of birth');
        return state;
      }

      // Update state with validated details
      return { ...state, ...action.payload };
    },
    resetUserDetails: () => initialState,  // Reset user state to initial
  },
});

export const { setUserDetails, resetUserDetails } = userSlice.actions;
export default userSlice.reducer;
