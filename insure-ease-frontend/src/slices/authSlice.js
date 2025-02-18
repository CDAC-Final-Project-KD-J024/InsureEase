import { createSlice } from '@reduxjs/toolkit';

//Dummy user data
const dummyUser = {
  id: '1',
  profilePicture: 'https://via.placeholder.com/150',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  dob: '1990-01-01',
  gender: 'Male',
  phone: '1234567890',
  address: {
    street: '123 Main St',
    city: 'Anytown',
    state: 'Anystate',
    country: 'Anycountry',
    pincode: '123456',
  },
  role: 'admin', // 'user' or 'admin'
  createdAt: '2025-01-01T00:00:00Z',
  updatedAt: '2025-01-01T00:00:00Z',
  policies: ['101', '102'], // User's purchased policies
  claims: ['201'], // User's claim requests
  orders: ['301'], // User's order history
};

const initialState = {
  user:dummyUser,
  isAuthenticated:true,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    updateUserProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      state.user.updatedAt = new Date().toISOString();
    },
    promoteUser: (state) => {
      if (state.user) {
        state.user.role = 'admin';
        state.user.updatedAt = new Date().toISOString();
      }
    },
    demoteUser: (state) => {
      if (state.user) {
        state.user.role = 'user';
        state.user.updatedAt = new Date().toISOString();
      }
    },
  },
});

export const { 
  loginRequest, 
  loginSuccess, 
  loginFailure, 
  logout, 
  updateUserProfile, 
  promoteUser, 
  demoteUser 
} = authSlice.actions;

export default authSlice.reducer;
