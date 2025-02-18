// store/store.js
// store modified
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import policyReducer from '../slices/policySlice';
import userPolicyReducer from '../slices/userPolicySlice';
import claimReducer from '../slices/claimSlice';
import adminReducer from '../slices/adminSlice';
import orderReducer from '../slices/orderSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    policies: policyReducer,
    userPolicies: userPolicyReducer,
    claims: claimReducer,
    admin: adminReducer,
    orders: orderReducer,
  },
});

export default store;
