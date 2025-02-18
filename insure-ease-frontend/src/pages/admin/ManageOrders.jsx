import { useSelector, useDispatch } from "react-redux";
import { updateOrderStatus } from "../../slices/orderSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);

 
  const handleStatusChange = (id, newStatus) => {
    dispatch(updateOrderStatus({ id, status: newStatus }));

    
    toast.success(`Order #${id} status updated to ${newStatus}`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  if (!orders || orders.length === 0) {
    return <div className="text-center mt-4"><strong>No orders available.</strong></div>;
  }

  return (
    <div className="container mt-4">
      <h2>Manage Orders</h2>
      <div className="card shadow p-4">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Policies Ordered</th>
              <th>Total Price ($)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.userId}</td>
                <td>{order.policies.join(", ")}</td>
                <td>${order.total}</td>
                <td>
                  <select 
                    className={form-select ${order.status === "Completed" ? "bg-success text-white" : order.status === "Cancelled" ? "bg-danger text-white" : "bg-warning text-dark"}}
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  >
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td>
                  <Link to={/admin/order-details/${order.id}} className="btn btn-info btn-sm me-2">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrders;