import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { renewUserPolicy } from "../../slices/userPolicySlice"; // ✅ Import correct action

const MyPolicies = () => {
  const dispatch = useDispatch();
  const policies = useSelector((state) => state.userPolicies.userPolicies);

  const handleRenewPolicy = (id) => {
    dispatch(renewUserPolicy(id)); // ✅ Dispatch renewUserPolicy
    toast.success("Policy renewal initiated!");
  };

  return (
    <div className="container mt-4">
      <h2>My Policies</h2>
      <div className="card p-3">
        {policies.length > 0 ? (
          policies.map((policy) => (
            <div key={policy.id} className="card mb-3 p-3">
              <h5>{policy.name}</h5>
              <p>Status: <strong>{policy.status}</strong></p>
              <p>Start Date: {policy.startDate}</p>
              <p>Expiry Date: {policy.endDate}</p>
              <Link to={`/policy/${policy.id}`} className="btn btn-primary me-2">
                View Details
              </Link>
              {policy.status === "Expired" && (
                <button
                  className="btn btn-warning"
                  onClick={() => handleRenewPolicy(policy.id)}
                >
                  Renew Policy
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No policies found.</p>
        )}
      </div>
    </div>
  );
};

export default MyPolicies;
