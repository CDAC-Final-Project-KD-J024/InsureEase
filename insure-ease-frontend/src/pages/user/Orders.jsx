import { useSelector } from "react-redux";
import {  toast } from "react-toastify";

const Orders = () => {
  // const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders); // Fetch from Redux store

  const handleViewDetails = (orderId) => {
    toast.info(`Viewing details for Order ID: ${orderId}`);
  };

  return (
    <div className="container mt-4">
      <h2>My Orders</h2>
      <div className="card p-3">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Policy Name</th>
              <th>Purchase Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.policyName}</td>
                  <td>{order.purchaseDate}</td>
                  <td>${order.premiumAmount}</td>
                  <td>
                    <span
                      className={`badge ${
                        order.paymentStatus === "Completed"
                          ? "bg-success"
                          : order.paymentStatus === "Pending"
                          ? "bg-warning"
                          : "bg-danger"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        order.paymentMethod === "Credit Card"
                          ? "bg-primary"
                          : "bg-secondary"
                      }`}
                    >
                      {order.paymentMethod}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => handleViewDetails(order.id)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
