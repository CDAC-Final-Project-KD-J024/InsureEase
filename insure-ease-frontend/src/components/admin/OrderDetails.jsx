import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderStatus, selectOrderById } from "../../slices/orderSlice";

const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();

  // Fetch order from Redux store
  const order = useSelector((state) => selectOrderById(state, orderId));

  // Update order status
  const handleStatusChange = (newStatus) => {
    dispatch(updateOrderStatus({ orderId, status: newStatus }));
    alert(Order status updated to ${newStatus});
  };

  if (!order) {
    return <div className="text-center mt-4"><strong>Order not found...</strong></div>;
  }

  return (
    <div className="container mt-4">
      <h2>Order Details</h2>
      <div className="card shadow p-4">
        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>User:</strong> {order.user} ({order.email})</p>
        <p><strong>Date:</strong> {order.date}</p>
        <p><strong>Total Price:</strong> ${order.total}</p>

        <h4>Policies Ordered</h4>
        <ul className="list-group mb-3">
          {order.policies.map((policy, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between">
              <span>{policy.name}</span>
              <span>${policy.price}</span>
            </li>
          ))}
        </ul>

        <label><strong>Status:</strong></label>
        <select 
          className={form-select mb-3 ${order.status === "Completed" ? "bg-success text-white" : order.status === "Cancelled" ? "bg-danger text-white" : "bg-warning text-dark"}}
          value={order.status}
          onChange={(e) => handleStatusChange(e.target.value)}
        >
          <option value="Processing">Processing</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <Link to="/admin/orders" className="btn btn-secondary">Back to Orders</Link>
      </div>
    </div>
  );
};

export default OrderDetails;