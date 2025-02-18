import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Claims = () => {
  const claims = useSelector((state) => state.claims.claims);
  const navigate = useNavigate();

  // Mapping policyId to policy name
  const policyNames = {
    101: "Car Insurance",
    102: "Health Insurance",
    103: "Home Insurance",
  };

  const handleViewDetails = (claim) => {
    toast.info(
      `Viewing details for ${policyNames[claim.policyId] || "Unknown Policy"}`
    );
    navigate(`/claims/${claim.id}`);
  };

  const handleNewClaim = () => {
    toast.success("Redirecting to submit a new claim...");
    navigate("/claims");
  };

  return (
    <div className="container mt-4">
      <h2>My Claims</h2>
      <button className="btn btn-primary mb-3" onClick={handleNewClaim}>
        Submit New Claim
      </button>
      <div className="card p-3">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Policy</th>
              <th>Status</th>
              <th>Filed Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {claims.length > 0 ? (
              claims.map((claim, index) => (
                <tr key={claim.id}>
                  <td>{index + 1}</td>
                  <td>{policyNames[claim.policyId] || "Unknown Policy"}</td>
                  <td>
                    <span
                      className={`badge ${
                        claim.claimStatus === "Approved"
                          ? "bg-success"
                          : claim.claimStatus === "Rejected"
                          ? "bg-danger"
                          : "bg-warning"
                      }`}
                    >
                      {claim.claimStatus}
                    </span>
                  </td>
                  <td>{claim.filedDate}</td>
                  <td>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => handleViewDetails(claim)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No claims found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Claims;
