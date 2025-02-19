// slices/adminSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { deleteUserApi, demoteUserApi, promoteUserApi, updateUserRoleApi } from "../api/adminService";
import { toast } from "react-toastify";

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
      const index = state.claims.findIndex((claim) => claim.id === action.payload);
      if (index !== -1) state.claims[index].claimStatus = "Approved";
    },
    rejectClaim: (state, action) => {
      const index = state.claims.findIndex((claim) => claim.id === action.payload);
      if (index !== -1) state.claims[index].claimStatus = "Rejected";
    },
    selectUserById: (state, action) => {
      state.selectedUser = state.users.find((user) => user.id === action.payload) || null;
    },
    deleteUserSuccess: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    updateUserRoleSuccess: (state, action) => {
      const { userId, role } = action.payload;
      const user = state.users.find((user) => user.id === userId);
      if (user) {
        user.role = role;
      }
    },
    promoteUserSuccess: (state, action) => {
      const { userId } = action.payload;
      const user = state.users.find((user) => user.id === userId);
      if (user) {
        user.role = "admin";
        user.updatedAt = new Date().toISOString();
      }
    },
    demoteUserSuccess: (state, action) => {
      const { userId } = action.payload;
      const user = state.users.find((user) => user.id === userId);
      if (user) {
        user.role = "user";
        user.updatedAt = new Date().toISOString();
      }
    }
  },
});

export const {
  fetchAdminDataRequest,
  fetchAdminDataSuccess,
  fetchAdminDataFailure,
  approveClaim,
  rejectClaim,
  deleteUserSuccess,
  selectUserById,
  updateUserRoleSuccess,
  promoteUserSuccess,
  demoteUserSuccess,
  
} = adminSlice.actions;


export default adminSlice.reducer;
// 🟢 Thunk for Promoting User
export const handlePromoteUser = (userId) => async (dispatch) => {
  try {
    await promoteUserApi(userId);
    dispatch(promoteUserSuccess({ userId })); // Pass userId to reducer
    toast.success("User promoted to admin successfully!");
  } catch (error) {
    toast.error(error.message);
  }
};

// 🟢 Thunk for Demoting User
export const handleDemoteUser = (userId) => async (dispatch) => {
  try {
    await demoteUserApi(userId);
    dispatch(demoteUserSuccess({ userId })); // Pass userId to reducer
    toast.success("User demoted to standard user successfully!");
  } catch (error) {
    toast.error(error.message);
  }
};

// 🟢 Thunk for Deleting User
export const handleDeleteUser = (userId) => async (dispatch) => {
  try {
    await deleteUserApi(userId);
    dispatch(deleteUserSuccess(userId));
    toast.success("User deleted successfully!");
  } catch (error) {
    toast.error(error.message);
  }
};

// 🟢 Thunk for Fetching User by ID
export const handleGetUserById = (userId) => async (dispatch) => {
  try {
    // const user = await getUserByIdApi(userId);
    dispatch(selectUserById(userId)); // Pass userId, not full user object
  } catch (error) {
    toast.error(error.message);
  }
};

// 🟢 Thunk for Updating User Role
export const handleUpdateUserRole = (userId, role) => async (dispatch) => {
  try {
    await updateUserRoleApi(userId, role);
    dispatch(updateUserRoleSuccess({ userId, role })); // Pass userId & role
    toast.success(`User role updated to ${role} successfully!`);
  } catch (error) {
    toast.error(error.message);
  }
};


