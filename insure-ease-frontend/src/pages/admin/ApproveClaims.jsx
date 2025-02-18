import { useSelector, useDispatch } from "react-redux";
import { updateClaimStatus } from "../../slices/claimSlice";
import { toast } from "react-toastify";

const ApproveClaims = () => {
  const dispatch = useDispatch();
  const claims = useSelector((state) => state.claims.claims);

  // Handle claim approval/rejection
  const handleUpdateStatus = (id, newStatus) => {
    dispatch(updateClaimStatus({ id, claimStatus: newStatus }));

    // Show toast notification
    toast.success(Claim ${id} marked as ${newStatus}, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  if (!claims || claims.length === 0) {
    return <div className="text-center mt-4"><strong>No pending claims.</strong></div>;
  }

  return (
    <div className="container mt-4">
      <h2>Approve Claims</h2>
      <div className="card shadow p-4">
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Policy</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((claim) => (
              <tr key={claim.id}>
                <td>{claim.id}</td>
                <td>{claim.userId}</td>
                <td>{claim.policyId}</td>
                <td>${claim.claimAmount}</td>
                <td>{claim.filedDate}</td>
                <td>
                  <span className={badge ${claim.claimStatus === "Approved" ? "bg-success" : claim.claimStatus === "Rejected" ? "bg-danger" : "bg-warning text-dark"}}>
                    {claim.claimStatus}
                  </span>
                </td>
                <td>
                  {claim.claimStatus === "Pending" && (
                    <>
                      <button className="btn btn-success btn-sm me-2" onClick={() => handleUpdateStatus(claim.id, "Approved")}>Approve</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleUpdateStatus(claim.id, "Rejected")}>Reject</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveClaims;