// slices/adminSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Dummy users data
const dummyUsers = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    role: "user", // 'admin' or 'user'
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },
  {
    id: "2",
    firstName: "Alice",
    lastName: "Smith",
    email: "alice.smith@example.com",
    role: "admin",
    createdAt: "2025-02-01T00:00:00Z",
    updatedAt: "2025-02-01T00:00:00Z",
  },
];

// Dummy claims data
const dummyClaims = [
  {
    id: "301",
    userId: "1",
    policyId: "101",
    policyName: "Comprehensive Car Insurance",
    claimAmount: 2000,
    claimStatus: "Pending", // Pending, Approved, Rejected
    submittedAt: "2025-03-01T00:00:00Z",
  },
  {
    id: "302",
    userId: "1",
    policyId: "102",
    policyName: "Term Life Insurance",
    claimAmount: 50000,
    claimStatus: "Approved",
    submittedAt: "2025-03-05T00:00:00Z",
  },
];

// Dummy orders data
const dummyOrders = [
  {
    id: "501",
    userId: "1",
    policyId: "101",
    policyName: "Comprehensive Car Insurance",
    premiumAmount: 500,
    paymentStatus: "Completed",
    purchaseDate: "2025-01-10",
  },
];

// Initial state
const initialState = {
  users: dummyUsers,
  claims: dummyClaims,
  orders: dummyOrders,
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    fetchAdminDataRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAdminDataSuccess: (state, action) => {
      state.users = action.payload.users || state.users;
      state.claims = action.payload.claims || state.claims;
      state.orders = action.payload.orders || state.orders;
      state.loading = false;
    },
    fetchAdminDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    approveClaim: (state, action) => {
      const index = state.claims.findIndex(
        (claim) => claim.id === action.payload
      );
      if (index !== -1) state.claims[index].claimStatus = "Approved";
    },
    rejectClaim: (state, action) => {
      const index = state.claims.findIndex(
        (claim) => claim.id === action.payload
      );
      if (index !== -1) state.claims[index].claimStatus = "Rejected";
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    selectUserById: (state, userId) =>
      state.admin.users.find((user) => user.id === userId),
  },
  updateUserRole: (state, action) => {
    const { userId, role } = action.payload;
    const user = state.users.find((user) => user.id === userId);
    if (user) user.role = role;
  },
  promoteUser: (state, action) => {
    state.users = state.users.map((user) =>
      user.id === action.payload ? { ...user, role: "Admin" } : user
    );
  },

  demoteUser: (state, action) => {
    state.users = state.users.map((user) =>
      user.id === action.payload ? { ...user, role: "User" } : user
    );
  },
});

export const {
  fetchAdminDataRequest,
  fetchAdminDataSuccess,
  fetchAdminDataFailure,
  approveClaim,
  rejectClaim,
  deleteUser,
  selectUserById,
  updateUserRole,
  promoteUser,
  demoteUser,
} = adminSlice.actions;
export default adminSlice.reducer;
