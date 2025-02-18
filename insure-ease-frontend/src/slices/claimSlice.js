// slices/claimSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Dummy claims data
const dummyClaims = [
  {
    id: '301',
    userId: '1',
    policyId: '101',
    claimAmount: 5000,
    claimReason: 'Car accident - front bumper damage',
    claimStatus: 'Pending', // Pending, Approved, Rejected
    filedDate: '2025-02-01',
    processedDate: null,
    approvedAmount: null,
    insurerRemarks: '',
    createdAt: '2025-02-01T00:00:00Z',
    updatedAt: '2025-02-01T00:00:00Z',
  },
  {
    id: '302',
    userId: '1',
    policyId: '102',
    claimAmount: 100000,
    claimReason: 'Medical emergency - heart surgery',
    claimStatus: 'Approved',
    filedDate: '2025-01-15',
    processedDate: '2025-01-20',
    approvedAmount: 95000,
    insurerRemarks: 'Approved with minor deduction for non-covered expenses',
    createdAt: '2025-01-15T00:00:00Z',
    updatedAt: '2025-01-20T00:00:00Z',
  },
];

const initialState = {
  claims: dummyClaims,
  loading: false,
  error: null,
};

const claimSlice = createSlice({
  name: 'claims',
  initialState,
  reducers: {
    fetchClaimsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchClaimsSuccess: (state, action) => {
      state.claims = action.payload;
      state.loading = false;
    },
    fetchClaimsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fileClaim: (state, action) => {
      state.claims.push(action.payload);
    },
    deleteClaim: (state, action) => {
      state.claims = state.claims.filter(claim => claim.id !== action.payload);
    },
    updateClaimStatus: (state, action) => {
      const { id, claimStatus } = action.payload;
      const claim = state.claims.find(claim => claim.id === id);
      if (claim) {
        claim.claimStatus = claimStatus;
        claim.updatedAt = new Date().toISOString();
      }
    },
  },
});

export const {
  fetchClaimsRequest,
  fetchClaimsSuccess,
  fetchClaimsFailure,
  fileClaim,
  updateClaimStatus,
  deleteClaim,
} = claimSlice.actions;
export default claimSlice.reducer;