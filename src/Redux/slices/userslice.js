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
      return { ...state, ...action.payload };
    },
  },
});

export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;
