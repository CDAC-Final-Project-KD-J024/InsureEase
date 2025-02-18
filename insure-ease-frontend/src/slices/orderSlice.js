import { createSlice, createSelector } from "@reduxjs/toolkit";

const dummyOrders = [
  {
    id: "501",
    userId: "1",
    policyId: "101",
    policyName: "Comprehensive Car Insurance",
    premiumAmount: 500,
    paymentStatus: "Completed",
    purchaseDate: "2025-01-10",
    renewalDate: "2026-01-10",
    paymentMethod: "Credit Card",
    transactionId: "TXN123456",
    createdAt: "2025-01-10T00:00:00Z",
    updatedAt: "2025-01-10T00:00:00Z",
  },
  {
    id: "502",
    userId: "1",
    policyId: "102",
    policyName: "Term Life Insurance",
    premiumAmount: 300,
    paymentStatus: "Pending",
    purchaseDate: "2025-02-01",
    renewalDate: "2026-02-01",
    paymentMethod: "UPI",
    transactionId: null,
    createdAt: "2025-02-01T00:00:00Z",
    updatedAt: "2025-02-01T00:00:00Z",
  },
];

const initialState = {
  orders: dummyOrders,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    fetchOrdersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchOrdersSuccess: (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    },
    fetchOrdersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    placeOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    updateOrderStatus: (state, action) => {
      const { id, status } = action.payload;
      const order = state.orders.find((order) => order.id === id);
      if (order) {
        order.paymentStatus = status;
        order.updatedAt = new Date().toISOString();
      }
    },
    deleteOrder: (state, action) => {
      state.orders = state.orders.filter((order) => order.id !== action.payload);
    },
  },
});

// ✅ Memoized Selector
export const selectOrderById = createSelector(
  (state) => state.orders.orders,
  (_, orderId) => orderId,
  (orders, orderId) => orders.find((order) => order.id === orderId)
);

export const {
  fetchOrdersRequest,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  placeOrder,
  updateOrderStatus,
  deleteOrder,
} = orderSlice.actions;

export default orderSlice.reducer;