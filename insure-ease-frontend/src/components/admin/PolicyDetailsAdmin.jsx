import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePolicyStatus, selectPolicyById } from "../../slices/policySlice";
import { toast } from "react-toastify";

const PolicyDetailsAdmin = () => {
  const { policyId } = useParams();
  const dispatch = useDispatch();

  // Fetch policy from Redux store
  const policy = useSelector((state) => selectPolicyById(state, policyId));

  // Handle policy approval/rejection
  const handleApproval = (newStatus) => {
    dispatch(updatePolicyStatus({ policyId, status: newStatus }));
    toast.success(Policy ${newStatus});
  };

  if (!policy) {
    return <div className="text-center mt-4"><strong>Policy not found...</strong></div>;
  }

  return (
    <div className="container mt-4">
      <h2>Policy Details (Admin)</h2>
      <div className="card shadow p-4">
        <h4>{policy.title}</h4>
        <p><strong>Description:</strong> {policy.description}</p>
        <p><strong>Coverage:</strong> {policy.coverage}</p>
        <p><strong>Price:</strong> {policy.price}</p>
        <p><strong>Status:</strong> 
          <span className={badge ${policy.status === "Approved" ? "bg-success" : "bg-warning"}}>
            {policy.status}
          </span>
        </p>

        <div className="mt-3">
          {policy.status === "Pending Approval" && (
            <>
              <button className="btn btn-success me-2" onClick={() => handleApproval("Approved")}>Approve</button>
              <button className="btn btn-danger" onClick={() => handleApproval("Rejected")}>Reject</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PolicyDetailsAdmin;