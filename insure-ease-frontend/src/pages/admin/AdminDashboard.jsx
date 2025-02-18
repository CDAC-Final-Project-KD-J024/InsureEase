import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// /src/pages/admin
const AdminDashboard = () => {
  // Fetch data from Redux store
  const users = useSelector((state) => state.admin.users);
  const policies = useSelector((state) => state.policies.policies);
  const claims = useSelector((state) => state.claims.claims);
  const orders = useSelector((state) => state.orders.orders);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Dashboard</h2>

      <div className="row">
        {/* Users */}
        <div className="col-md-3">
          <div className="card text-white bg-primary mb-3">
            <div className="card-body">
              <h5 className="card-title">Users</h5>
              <p className="card-text">Total: {users.length}</p>
              <Link to="/admin/users" className="btn btn-light">Manage Users</Link>
            </div>
          </div>
        </div>

        {/* Policies */}
        <div className="col-md-3">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title">Policies</h5>
              <p className="card-text">Total: {policies.length}</p>
              <Link to="/admin/policies" className="btn btn-light">Manage Policies</Link>
            </div>
          </div>
        </div>

        {/* Claims */}
        <div className="col-md-3">
          <div className="card text-white bg-warning mb-3">
            <div className="card-body">
              <h5 className="card-title">Claims</h5>
              <p className="card-text">Pending: {claims.length}</p>
              <Link to="/admin/claims" className="btn btn-light">Approve Claims</Link>
            </div>
          </div>
        </div>

        {/* Orders */}
        <div className="col-md-3">
          <div className="card text-white bg-danger mb-3">
            <div className="card-body">
              <h5 className="card-title">Orders</h5>
              <p className="card-text">Total: {orders.length}</p>
              <Link to="/admin/orders" className="btn btn-light">Manage Orders</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics */}
      <div className="text-center mt-4">
        <Link to="/admin/analytics" className="btn btn-dark">View Analytics</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;