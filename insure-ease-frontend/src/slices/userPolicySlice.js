import { createSlice } from '@reduxjs/toolkit';

// Dummy user policies data
const dummyUserPolicies = [
  {
    id: '201',
    userId: '1',
    policyId: '101',
    name: 'Comprehensive Car Insurance',
    type: 'Car',
    premium: 500,
    coverage: 'Full coverage including theft, fire, and accidents',
    startDate: '2025-01-10',
    endDate: '2026-01-10',
    status: 'Active', // Active, Expired, Pending
    provider: 'ABC Insurance Co.',
    paymentStatus: 'Paid',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
  },
  {
    id: '202',
    userId: '1',
    policyId: '102',
    name: 'Term Life Insurance',
    type: 'Life',
    premium: 300,
    coverage: 'Life coverage up to $500,000',
    startDate: '2024-12-15',
    endDate: '2034-12-15',
    status: 'Active',
    provider: 'XYZ Life Co.',
    paymentStatus: 'Paid',
    createdAt: '2024-12-15T00:00:00Z',
    updatedAt: '2024-12-15T00:00:00Z',
  },
];

const initialState = {
  userPolicies: dummyUserPolicies,
  loading: false,
  error: null,
};

const userPolicySlice = createSlice({
  name: 'userPolicies',
  initialState,
  reducers: {
    fetchUserPoliciesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUserPoliciesSuccess: (state, action) => {
      state.userPolicies = action.payload;
      state.loading = false;
    },
    fetchUserPoliciesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addUserPolicy: (state, action) => {
      state.userPolicies.push(action.payload);
    },
   
  },
});


export const {
  fetchUserPoliciesRequest,
  fetchUserPoliciesSuccess,
  fetchUserPoliciesFailure,
  addUserPolicy,

} = userPolicySlice.actions;

export default userPolicySlice.reducer;