import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const policies = useSelector((state) => state.policy.policies);
  const claims = useSelector((state) => state.claim.claims);
  const orders = useSelector((state) => state.order.orders);

  // Compute stats
  const totalPolicies = policies.length;
  const activeClaims = claims.filter((claim) => claim.claimStatus === "Pending").length;
  const pendingOrders = orders.filter((order) => order.status === "Pending").length;

  // Recent activity (combining orders, claims, and policies)
  const recentActivity = [
    ...orders.map((order) => ({
      id: `order-${order.id}`,
      type: "order",
      description: `Ordered ${order.policyName}`,
      date: order.date,
    })),
    ...claims.map((claim) => ({
      id: `claim-${claim.id}`,
      type: "claim",
      description: `Filed a claim for ${claim.policyName}`,
      date: claim.filedDate,
    })),
    ...policies.map((policy) => ({
      id: `policy-${policy.id}`,
      type: "policy",
      description: `Purchased ${policy.name}`,
      date: policy.purchaseDate,
    })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by most recent

  return (
    <div className="container mt-4">
      <h2>Welcome, {user?.firstName} {user?.lastName}!</h2>
      <p>Email: {user?.email}</p>

      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card p-3 text-center">
            <h5>Total Policies</h5>
            <h2>{totalPolicies}</h2>
            <Link to="/my-policies" className="btn btn-primary mt-2">View Policies</Link>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 text-center">
            <h5>Active Claims</h5>
            <h2>{activeClaims}</h2>
            <Link to="/claims" className="btn btn-warning mt-2">Manage Claims</Link>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 text-center">
            <h5>Pending Orders</h5>
            <h2>{pendingOrders}</h2>
            <Link to="/orders" className="btn btn-info mt-2">View Orders</Link>
          </div>
        </div>
      </div>

      <h4 className="mt-4">Recent Activity</h4>
      <ul className="list-group">
        {recentActivity.length > 0 ? (
          recentActivity.map((activity) => (
            <li key={activity.id} className="list-group-item">
              <strong>{activity.type.toUpperCase()}</strong>: {activity.description} ({activity.date})
            </li>
          ))
        ) : (
          <li className="list-group-item text-center">No recent activity.</li>
        )}
      </ul>
    </div>
  );
};

export default Dashboard;
